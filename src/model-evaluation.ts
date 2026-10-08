import type { ChatMessage, GatewayResult } from "./gateway";
import { type ModelEvaluation, type ModelInfo, revision } from "./model-registry";

export const EVALUATION_MAX_OUTPUT = 768;
export type EvaluationCall = (model: ModelInfo, messages: ChatMessage[]) => Promise<GatewayResult>;

interface Probe {
  name: string;
  level: "basic" | "balanced" | "complex" | "vision" | "pdf";
  messages: ChatMessage[];
  check: (text: string) => boolean;
}

function textProbe(
  name: string,
  level: Probe["level"],
  prompt: string,
  check: Probe["check"],
): Probe {
  return { name, level, messages: [{ role: "user", content: prompt }], check };
}

function jsonOf(text: string): Record<string, any> | null {
  try {
    return JSON.parse(text.replace(/^```(?:json)?\s*|\s*```$/g, ""));
  } catch {
    return null;
  }
}

/** Small deterministic acceptance suite, not a claim of general benchmark superiority. */
export const TEXT_PROBES: Probe[] = [
  textProbe(
    "japanese-json",
    "basic",
    "次の情報をJSONだけで返してください。名前はさかな、個数は3。キーはnameとcount。",
    (text) => {
      const value = jsonOf(text);
      return value?.name === "さかな" && value?.count === 3;
    },
  ),
  textProbe(
    "arithmetic",
    "basic",
    "Compute 17 * 23. Reply with the integer only.",
    (text) => text.trim() === "391",
  ),
  textProbe(
    "summary",
    "basic",
    "次の文章を日本語の一文で要約してください。『会議は火曜日から木曜日へ延期され、場所は大阪から東京に変更された。』",
    (text) => text.includes("木曜") && text.includes("東京") && text.length <= 150,
  ),
  textProbe(
    "constraints",
    "balanced",
    'A meeting must be after 09:00 and before 12:00. Alice is free 09:00-10:00 and 11:00-12:00; Bob 09:30-11:30. List the two overlap intervals in chronological order. Return ONLY JSON {"intervals":[["HH:MM","HH:MM"],...]}.',
    (text) => JSON.stringify(jsonOf(text)?.intervals) === '[["09:30","10:00"],["11:00","11:30"]]',
  ),
  textProbe(
    "code",
    "balanced",
    'JavaScript: "🎉a".slice(0,1) splits a surrogate pair. Return ONLY JSON {"method":"..."} naming the built-in method that converts this string to an array of Unicode code points before slicing.',
    (text) => jsonOf(text)?.method === "Array.from",
  ),
  textProbe(
    "critical-path",
    "complex",
    'Tasks: A takes 3, B takes 5 after A, C takes 2 after A, D takes 4 after both B and C, E takes 8 after C, F takes 1 after both D and E. Unlimited parallel workers. Return ONLY JSON {"duration":number,"critical_path":["A",...]}.',
    (text) => {
      const value = jsonOf(text);
      return value?.duration === 14 && JSON.stringify(value.critical_path) === '["A","C","E","F"]';
    },
  ),
];

// A red 64x64 PNG; a data URI keeps evaluation independent of expiring external fixtures.
const RED_PNG =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAIAAAAlC+aJAAAAgElEQVR4nO3RwQkAMAwDMe+/dDtEH6Jw4AES3c729fwFPaAJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJK6AJKzCv+LILqdzw4i4ZAl4AAAAASUVORK5CYII=";

function fixturePdf(): string {
  const stream = "BT /F1 24 Tf 50 100 Td (CHECK-4821) Tj ET";
  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 200] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  objects.forEach((object, i) => {
    offsets.push(pdf.length);
    pdf += `${i + 1} 0 obj\n${object}\nendobj\n`;
  });
  const xref = pdf.length;
  pdf += `xref\n0 6\n0000000000 65535 f \n${offsets
    .slice(1)
    .map((offset) => `${String(offset).padStart(10, "0")} 00000 n \n`)
    .join("")}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
  return btoa(pdf);
}

export async function evaluateModel(
  model: ModelInfo,
  call: EvaluationCall,
  now = Date.now(),
): Promise<ModelEvaluation> {
  const probes = [...TEXT_PROBES];
  if (model.tags.includes("vision"))
    probes.push({
      name: "vision",
      level: "vision",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "What color is the image? Reply with RED, GREEN, or BLUE only." },
            { type: "image_url", image_url: { url: RED_PNG } },
          ],
        },
      ],
      check: (text) => text.trim().toUpperCase() === "RED",
    });
  if (model.tags.includes("file-input"))
    probes.push({
      name: "pdf",
      level: "pdf",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Return only the CHECK code written in this PDF." },
            { type: "file", file: { data: fixturePdf(), media_type: "application/pdf" } },
          ],
        },
      ],
      check: (text) => text.trim() === "CHECK-4821",
    });
  const passed = new Map<string, boolean>();
  let latencyMs = 0;
  let run = 0;
  for (const probe of probes) {
    const result = await call(model, probe.messages);
    const ok = result.finishReason === "stop" && probe.check(result.text);
    passed.set(probe.name, ok);
    latencyMs += result.latencyMs;
    run += 1;
    // Every other level requires basic, so the remaining probes could not change the result.
    if (!ok && probe.level === "basic") break;
  }
  const passLevel = (level: Probe["level"]) => {
    const group = probes.filter((probe) => probe.level === level);
    return group.length > 0 && group.every((probe) => passed.get(probe.name));
  };
  const basic = passLevel("basic");
  const balanced = basic && passLevel("balanced");
  return {
    revision: revision(model),
    testedAt: now,
    basic,
    balanced,
    complex: balanced && passLevel("complex"),
    vision: basic && passLevel("vision"),
    pdf: basic && passLevel("pdf"),
    latencyMs: latencyMs / run,
    failures: 0,
    disabledUntil: 0,
  };
}
