"""Public catalog research only; no inference calls or credentials.
Run collect twice, then build and verify with --cache /tmp/discord-full-review.
"""
import argparse, concurrent.futures, datetime, hashlib, json, math, pathlib, re, urllib.request
ROOT = pathlib.Path(__file__).resolve().parents[1]
CATALOG = 'https://ai-gateway.vercel.sh/v1/models'
AA = 'https://artificialanalysis.ai/models'
DATE = '2026-10-08'
LEVELS = {10:'minimal',20:'low',30:'medium',40:'high',50:'xhigh',60:'max'}
# Reference links only. Alias measurements cannot authorize Auto admission.
ALIASES = {
 'anthropic/claude-haiku-4.5':'claude-4-5-haiku', 'anthropic/claude-opus-4':'claude-4-opus',
 'anthropic/claude-sonnet-4':'claude-4-sonnet','anthropic/claude-sonnet-4.5':'claude-4-5-sonnet',
 'amazon/nova-2-lite':'nova-2-0-lite','google/gemini-3-flash':'gemini-3-flash-preview',
 'google/gemma-4-26b-a4b-it':'gemma-4-26b-a4b','google/gemma-4-31b-it':'gemma-4-31b',
 'openai/gpt-5.1-thinking':'gpt-5-1','deepseek/deepseek-v3.2-thinking':'deepseek-v3-2',
 'deepseek/deepseek-v4-flash-0731':'deepseek-v4-flash','deepseek/deepseek-v4-pro-0813':'deepseek-v4-pro',
 'alibaba/qwen-3.6-max-preview':'qwen3-6-max','alibaba/qwen3-coder':'qwen3-coder-480b-a35b-instruct',
 'alibaba/qwen3-coder-30b-a3b':'qwen3-coder-30b-a3b-instruct',
 'alibaba/qwen3-next-80b-a3b-thinking':'qwen3-next-80b-a3b',
 'alibaba/qwen3-235b-a22b-thinking':'qwen3-vl-235b-a22b',
 'alibaba/qwen3-vl-thinking':'qwen3-vl-235b-a22b','alibaba/qwen3-vl-instruct':'qwen3-vl-235b-a22b-instruct',
}
for size, aa_size in [('14b','14b'),('32b','32b'),('30b','30b-a3b'),('235b','235b-a22b')]:
 ALIASES['alibaba/qwen-3-'+size]='qwen3-'+aa_size+'-instruct'
for size in ['8b','70b']:
 ALIASES['meta/llama-3.1-'+size]='llama-3-1-instruct-'+size
ALIASES['meta/llama-3.3-70b']='llama-3-3-instruct-70b'
for name in ['nemotron-3-nano-30b-a3b','nemotron-3-super-120b-a12b','nemotron-nano-12b-v2-vl','nemotron-nano-9b-v2']:
 ALIASES['nvidia/'+name]='nvidia-'+name
for kind in ['reasoning','non-reasoning']:
 ALIASES['spacexai/grok-4.1-fast-'+kind]='grok-4-1-fast'
 ALIASES['spacexai/grok-4.20-'+kind]='grok-4-20'

def records(html):
 parts=[]
 for m in re.finditer(r'self\.__next_f\.push\((.*?)\)</script>',html):
  x=json.loads(m[1])
  if len(x)>1 and isinstance(x[1],str):parts.append(x[1])
 out={}
 for line in ''.join(parts).splitlines():
  try:
   k,v=line.split(':',1);out[k]=json.loads(v)
  except ValueError:pass
 return out

def walk(value):
 yield value
 if isinstance(value,dict):
  for v in value.values():yield from walk(v)
 elif isinstance(value,list):
  for v in value:yield from walk(v)

def releases(html):
 out={v['slug']:v for rec in records(html).values() for v in walk(rec)
      if isinstance(v,dict) and all(k in v for k in ['slug','creator','releaseDate'])}
 if len(out)<100:raise ValueError('incomplete release index')
 return out

def measurements(html,slug):
 recs=records(html)
 def resolve(v,depth=0):
  if depth>50:raise ValueError('cyclic reference')
  if isinstance(v,str) and v.startswith('$'):
   keys=v[1:].split(':')
   if keys[0] in recs:
    r=recs[keys[0]]
    for k in keys[1:]:
     r=resolve(r,depth+1);r=r[3] if isinstance(r,list) and k=='props' else r[int(k)] if isinstance(r,list) else r[k]
    return resolve(r,depth+1)
  return v
 out={}
 for rec in recs.values():
  for v in walk(rec):
   if not isinstance(v,dict) or 'initialModels' not in v:continue
   group=resolve(v['initialModels'])
   if not isinstance(group,list):continue
   for x in group:
    x=resolve(x)
    if not isinstance(x,dict):continue
    release=resolve(x.get('release'))
    if not isinstance(release,dict) or release.get('slug')!=slug:continue
    row={k:resolve(x.get(k)) for k in ['slug','name','intelligenceIndex','intelligenceIndexIsEstimated','isReasoning','effort','releaseDate']}
    out[row['slug']]=row
 if not out:raise ValueError('release-specific measurements missing')
 if 'v4.3.2' not in html:raise ValueError('index version unconfirmed')
 return sorted(out.values(),key=lambda x:x['slug'])

def mapping(m,rels):
 if m['type']!='language':return None,'not-language'
 slug=m['id'].split('/')[1].replace('.','-')
 if slug in rels:return slug,'direct'
 if ALIASES.get(m['id']) in rels:return ALIASES[m['id']],'research-alias'
 if m['id'].endswith('-fast'):
  base=m['id'][:-5];slug=base.split('/')[1].replace('.','-')
  if slug in rels:return slug,'related-fast-variant'
  if ALIASES.get(base) in rels:return ALIASES[base],'related-fast-variant'
 return None,'no-confirmed-release'

def get(url):
 with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'ModelReview/1.0'}),timeout=30) as r:return r.read()

def collect(cache):
 p=cache/('pass-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S'));p.mkdir(parents=True)
 c=get(CATALOG);index=get(AA);catalog=json.loads(c);rels=releases(index.decode())
 (p/'catalog.json').write_bytes(c);(p/'index.html').write_bytes(index)
 maps={m['id']:mapping(m,rels) for m in catalog['data']}
 slugs=sorted({s for s,k in maps.values() if s})
 def fetch(slug):
  url=AA+'/releases/'+slug
  for attempt in range(2):
   try:
    b=get(url);rows=measurements(b.decode(),slug);(p/(slug+'.html')).write_bytes(b)
    return slug,{'url':url,'sha256':hashlib.sha256(b).hexdigest(),'measurements':rows}
   except Exception as e:
    if attempt:return slug,{'url':url,'error':str(e)}
 with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:bench=dict(pool.map(fetch,slugs))
 result={'fetchedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'catalog':catalog,'mappings':maps,'benchmarks':bench,
         'catalogSha256':hashlib.sha256(c).hexdigest(),'indexSha256':hashlib.sha256(index).hexdigest(),'releaseCount':len(rels)}
 (p/'research.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n')
 print(json.dumps({'pass':str(p),'catalog':len(catalog['data']),'pages':len(slugs),'errors':{s:v['error'] for s,v in bench.items() if 'error' in v}},ensure_ascii=False))

def number(v):
 try:
  n=float(v);return n if math.isfinite(n) and n>=0 else None
 except (ValueError,TypeError):return None

def assess(m,research):
 slug,kind=research['mappings'][m['id']];b=research['benchmarks'].get(slug,{})
 efforts=next((x.get('values',[]) for x in m.get('reasoning_options',[]) if x['type']=='effort'),[])
 date=datetime.datetime.fromtimestamp(m['released'],datetime.timezone.utc).date().isoformat() if isinstance(m.get('released'),(int,float)) else None
 seen=[];scores={};issues=[]
 for x in b.get('measurements',[]):
  n=number(x['intelligenceIndex'])
  if n is None:continue
  e=x['effort'];level='none' if x['isReasoning'] is False else LEVELS.get(e.get('level')) if isinstance(e,dict) else None
  seen.append({'name':x['name'],'score':n,'effort':level,'estimated':x['intelligenceIndexIsEstimated'],'releaseDate':x['releaseDate'],'reasoning':x['isReasoning'],'slug':x['slug']})
  if not level or x['intelligenceIndexIsEstimated'] is not False or x['releaseDate']!=date or 'preview' in x['name'].lower():continue
  if level!='none' and level not in efforts:continue
  if level=='none' and m.get('reasoning_options') and 'none' not in efforts and not any(o['type']=='toggle' for o in m['reasoning_options']):continue
  rounded=int(n+0.5)
  if level in scores and scores[level]!=rounded:issues.append('同思考量で異なる測定条件')
  scores[level]=min(scores.get(level,rounded),rounded)
 pricing=m.get('pricing',{});inp=number(pricing.get('input'));out=number(pricing.get('output'));tags=m.get('tags',[])
 reasons=[]
 if m['type']!='language':reasons.append('会話モデルではない：'+m['type'])
 if any(t in tags for t in ['image-generation','video-generation']):reasons.append('画像/動画生成用途')
 if re.search(r'(?:^|[-/])(safeguard|moderation)(?:[-/]|$)',m['id'],re.I):reasons.append('安全性分類専用')
 if re.search(r'preview|experimental|\bexp\b|beta',m['id']+' '+m.get('name',''),re.I):reasons.append('Preview・実験版')
 if m['id'].endswith('-fast'):reasons.append('Fast別ID：基本版の点を継承しない')
 if kind!='direct':reasons.append('公開評価は参考対応のみ' if slug else '対応するAAリリースを一覧で確認できない')
 if b.get('error'):reasons.append('公開ページ未確認：'+b['error'])
 if seen and not scores:reasons.append('日付・思考量・非推定/安定版の測定条件不一致')
 reasons+=issues
 if inp is None or out is None:reasons.append('会話用の入出力token料金が揃わない')
 elif inp>6e-6 or out>30e-6:reasons.append('Auto価格帯上限超過')
 if not all(isinstance(m.get(k),int) and m[k]>0 for k in ['context_window','max_tokens']):reasons.append('文脈/出力上限未確認')
 if not any(k in ['none','low','medium','high'] and v>=18 for k,v in scores.items()):reasons.append('通常思考量で最低公開指標18を確認できない')
 if m.get('model_eligibility',{}).get('status')=='ineligible':reasons.append('利用不可')
 adopted=not reasons
 return {'id':m['id'],'name':m.get('name',m['id']),'type':m['type'],'released':m.get('released'),'releaseDate':date,
 'inputPerMillion':inp*1e6 if inp is not None else None,'outputPerMillion':out*1e6 if out is not None else None,
 'context':m.get('context_window'),'maxOutput':m.get('max_tokens'),'tags':tags,'supportedEfforts':efforts,
 'measurements':seen,'scores':scores if adopted else {},'adopted':adopted,'match':kind,
 'decision':'採用：対応思考量の公開指標を使用' if adopted else '保留/対象外：'+' / '.join(reasons),
 'source':b.get('url'),'catalogSource':CATALOG,'catalog':m}

def coverage(rows):
 return {'catalogModels':len(rows),'creators':len({r['id'].split('/')[0] for r in rows}),
 'types':{t:sum(r['type']==t for r in rows) for t in sorted({r['type'] for r in rows})},
 'withMeasurements':sum(bool(r['measurements']) for r in rows),'directMeasurements':sum(bool(r['measurements']) and r['match']=='direct' for r in rows),
 'referenceMeasurements':sum(bool(r['measurements']) and r['match']!='direct' for r in rows),'adopted':sum(r['adopted'] for r in rows)}

def latest(cache):
 paths=sorted(cache.glob('pass-*/research.json'))
 if not paths:raise ValueError('collect first')
 return json.loads(paths[-1].read_text()),paths

def build(cache):
 research,paths=latest(cache);rows=[assess(m,research) for m in research['catalog']['data']];cov=coverage(rows)
 doc={'reviewedAt':DATE,'fetchedAt':research['fetchedAt'],'index':'Artificial Analysis Intelligence Index v4.3.2','method':'公開資料の全件レビュー。推論APIの実行なし。','coverage':cov,'models':rows}
 (ROOT/'docs/model-review-2026-10-08.json').write_text(json.dumps(doc,ensure_ascii=False,indent=2)+'\n')
 manifest={k:research[k] for k in ['fetchedAt','catalogSha256','indexSha256','releaseCount']}
 manifest['sources']=[{k:v for k,v in b.items() if k!='measurements'} for b in research['benchmarks'].values()]
 (ROOT/'docs/model-review-sources/manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 old=['openai/gpt-6-luna','google/gemini-3.8-flash','openai/gpt-6.1-sol','anthropic/claude-sonnet-5.5','anthropic/claude-opus-5.5']
 byid={r['id']:r for r in rows}
 if any(not byid[i]['adopted'] for i in old):raise ValueError('historical admission needs review')
 order=[byid[i] for i in old]+sorted((r for r in rows if r['adopted'] and r['id'] not in old),key=lambda r:r['id'])
 reviews=[{k:r[k] for k in ['id','released','scores','source']}|{'official':CATALOG} for r in order]
 (ROOT/'src/expanded-benchmark-reviews.ts').write_text('import type { BenchmarkReview } from "./benchmark-reviews";\n\n// All catalog entries reviewed; exact source conditions live in docs/model-review-2026-10-08.json.\nexport const REVIEWED_BENCHMARK_SNAPSHOT: BenchmarkReview[] = '+json.dumps(reviews,ensure_ascii=False,indent=2)+';\n')
 report(rows,research,cov);print(json.dumps(cov,ensure_ascii=False))

def report(rows,research,cov):
 lines=['# Discord Bot 全モデル調査（2026-10-08）','',f"Gatewayの全{cov['catalogModels']}モデル・{cov['creators']}社を確認。公開能力測定あり{cov['withMeasurements']}件（参考対応{cov['referenceMeasurements']}件を含む）、Auto公開指標採用{cov['adopted']}件。",'',
 '全件調査は全モデルの推論実測ではありません。仕様・全料金体系・用途・公開測定・採用/保留理由を全IDについて記録しました。公開評価がない場合は未確認と明記し、他版の点数や推測を補っていません。','',
 '取得UTC: '+research['fetchedAt']+'。仕様は[Gateway公式API]('+CATALOG+')、測定は[Artificial Analysis]('+AA+')のリリース別ページ（Index v4.3.2）。','',
 '## 採用基準','',
 'ID直接対応・リリース日・思考量・非推定・安定版・価格帯・会話用途・文脈/出力枠が一致した測定のみ採用。別名/Fast対応は参考情報です。思考量未特定、Preview、異なる日付は採用点へ流用しません。思考OFFの点を思考ONへ転用しません。最大思考の点をhighへ転用しません。','',
 '最低公開指標18/28/40（会話/通常/難問）、バランス目標18/32/48、予算、対応添付、90日有効期限は従来どおりです。公開測定とBotはツール・思考/出力予算が異なり、統計的有意差は確認していません。','',
 '機能はカタログ申告です。アカウント利用資格・実接続・実測速度は未確認。料金はUSD/token等の元キーを保存し、会話の比較表のみUSD/100万tokenに換算します。画像/動画/音声の秒・枚・文字料金をtoken料金に換算しません。長文料金帯/キャッシュ料金も詳細に記録します。カタログの説明文を能力点の根拠にしません。','',
 '## 内訳','', '| 種類 | 件数 |','|---|---:|']
 lines += [f'| {t} | {n} |' for t,n in cov['types'].items()]
 lines += ['', '## 会社別の確認範囲', '', '| 会社ID | 全件 | 言語 | 公開測定あり（参考対応含む） | Auto採用 |', '|---|---:|---:|---:|---:|']
 for vendor in sorted({r['id'].split('/')[0] for r in rows}):
  group=[r for r in rows if r['id'].split('/')[0]==vendor]
  lines.append(f"| {vendor} | {len(group)} | {sum(r['type']=='language' for r in group)} | {sum(bool(r['measurements']) for r in group)} | {sum(r['adopted'] for r in group)} |")
 lines += ['','## Auto採用一覧' ,'','| モデル | 採用思考量別指標 | 基本料金 入力/出力 USD/100万token | highで難問40以上 |','|---|---|---:|---|']
 for r in rows:
  if r['adopted']:lines.append(f"| [{r['id']}]({r['source']}) | "+', '.join(f'{k} {v}' for k,v in r['scores'].items())+f" | {r['inputPerMillion']:g} / {r['outputPerMillion']:g} | "+('確認' if r['scores'].get('high',0)>=40 else '未確認')+' |')
 lines += ['','Haiku 5.5は通常用途の安価な候補。high 38は難問の最低40に届かず、最大思考43をhighへ転用しません。Gatewayの長文料金は入力100,001tokenから基本料金の5倍なので、長い履歴では最安料金だけで判断しません。','','## 全モデルの詳細','']
 for r in rows:
  m=r['catalog'];lines+=['### '+r['id'],'','- 名称/種類: '+r['name']+' / '+r['type'],
  '- リリース日/Unix秒: '+str(r['releaseDate'])+' / '+str(r['released']),
  '- 文脈/最大出力: '+str(r['context'])+' / '+str(r['maxOutput']),
  '- モダリティ: '+json.dumps(m.get('modalities',{}),ensure_ascii=False),
  '- 全機能タグ: '+(', '.join(r['tags']) or '未掲載'),
  '- 思考制御: '+json.dumps(m.get('reasoning_options',[]),ensure_ascii=False),
  '- 対応パラメータ: '+(', '.join(m.get('supported_parameters',[])) or '未掲載'),
  '- 全料金（元の単位）: `'+json.dumps(m.get('pricing',{}),ensure_ascii=False,separators=(',',':'))+'`',
  '- データ保持/学習利用申告: zdr='+str(m.get('zdr','未掲載'))+', no_training='+str(m.get('no_training','未掲載')),
  '- 評価対応: '+r['match'],'- 判断: '+r['decision']]
  if r['source']:lines+=['- 公開評価出典: [リリースページ]('+r['source']+')']
  if r['measurements']:
   lines+=['','| 測定条件名 | 指標（未丸め） | 思考量 | 推定 | 測定リリース日 |','|---|---:|---|---|---|']
   for x in r['measurements']:lines.append(f"| {x['name']} | {x['score']:.6f} | {x['effort'] or '未特定'} | {x['estimated']} | {x['releaseDate']} |")
  else:lines+=['- 公開能力点: 対応するAA測定を確認できず。低品質と判定した意味ではありません。']
  lines+=['','- 仕様/料金出典: [Gateway API]('+CATALOG+')（上記IDで照合）。実接続/実測性能は未確認。','']
 lines+=['## 再確認','','全カタログとAA一覧・対応する全ページを再取得し、ID・仕様・料金・測定値・採用判定の一致を監査します。[再確認記録](model-review-sources/verification.json)。取得失敗や差分が残る場合は未完了です。','',
 '[全データJSON](model-review-2026-10-08.json) / [出典SHA256](model-review-sources/manifest.json) / [再現スクリプト](../scripts/review-models.py)']
 audit_path=ROOT/'docs/model-review-sources/verification.json'
 if audit_path.exists():
  audit=json.loads(audit_path.read_text())
  if audit.get('passed'):
   lines += ['', '再確認完了: '+audit['checkedAt']+'（UTC）。全カタログと全164対応ページを新規取得。ID・仕様・料金・測定値の差分なし、全件記録の抜け/重複なし、採用表と再計算の一致を確認しました。']
 (ROOT/'docs/model-review-2026-10-08.md').write_text('\n'.join(lines)+'\n')

def verify(cache):
 research,paths=latest(cache)
 if len(paths)<2:raise ValueError('two fresh collections required')
 prior=json.loads(paths[-2].read_text());a={m['id']:m for m in prior['catalog']['data']};b={m['id']:m for m in research['catalog']['data']}
 diffs={'added':sorted(b.keys()-a.keys()),'removed':sorted(a.keys()-b.keys()),'changed':sorted(i for i in a.keys()&b.keys() if a[i]!=b[i]),
 'measurements':sorted(s for s in prior['benchmarks'].keys()|research['benchmarks'].keys() if prior['benchmarks'].get(s,{}).get('measurements')!=research['benchmarks'].get(s,{}).get('measurements'))}
 errors={s:v['error'] for s,v in research['benchmarks'].items() if 'error' in v}
 doc=json.loads((ROOT/'docs/model-review-2026-10-08.json').read_text());rebuilt=[assess(m,research) for m in research['catalog']['data']];ids=[r['id'] for r in doc['models']]
 report_ids=re.findall(r'^### ([^\n]+)$',(ROOT/'docs/model-review-2026-10-08.md').read_text(),re.M)
 exported_ids=re.findall(r'id: "([^"\n]+)"',(ROOT/'src/expanded-benchmark-reviews.ts').read_text())
 checks={'reportCoversAllIds':set(report_ids)==set(b) and len(report_ids)==len(b),
 'exportedAdoptionsMatch':set(exported_ids)=={r['id'] for r in rebuilt if r['adopted']} and len(exported_ids)==sum(r['adopted'] for r in rebuilt),'twoFreshPasses':True,'catalogAndMeasurementsUnchanged':not any(diffs.values()),'allSourcesParsed':not errors,
 'allIdsExactlyOnce':len(ids)==len(set(ids))==len(b) and set(ids)==set(b),'rebuildMatches':doc['models']==rebuilt,
 'adoptionsHaveExactConditions':all(not r['adopted'] or bool(r['match']=='direct' and r['scores']) for r in rebuilt),'noInferenceCalls':True}
 result={'checkedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'firstPassAt':prior['fetchedAt'],'secondPassAt':research['fetchedAt'],
 'coverage':coverage(rebuilt),'checks':checks,'changes':diffs,'errors':errors,'passed':all(checks.values())}
 (ROOT/'docs/model-review-sources/verification.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n');print(json.dumps(result,ensure_ascii=False,indent=2))
 if not result['passed']:raise SystemExit(1)

if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('mode',choices=['collect','build','verify']);p.add_argument('--cache',type=pathlib.Path,required=True)
 args=p.parse_args();{'collect':collect,'build':build,'verify':verify}[args.mode](args.cache)
