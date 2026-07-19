/** Builds a tiny valid single-page PDF with a title line — demo documents only. */
export function makeDemoPdf(title: string, lines: string[] = []): Buffer {
  const esc = (s: string) => s.replace(/[\\()]/g, ' ').replace(/[^\x20-\x7E]/g, '?')
  const safe = esc(title)
  let stream = `BT /F1 20 Tf 72 720 Td (${safe}) Tj ET\nBT /F1 11 Tf 72 690 Td (Document de demonstration - contenu fictif.) Tj ET`
  let y = 660
  for (const line of lines) {
    stream += `\nBT /F1 11 Tf 72 ${y} Td (${esc(line)}) Tj ET`
    y -= 18
    if (y < 72) break
  }
  const objects = [
    '<</Type/Catalog/Pages 2 0 R>>',
    '<</Type/Pages/Kids[3 0 R]/Count 1>>',
    '<</Type/Page/Parent 2 0 R/MediaBox[0 0 612 792]/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>',
    `<</Length ${stream.length}>>\nstream\n${stream}\nendstream`,
    '<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>',
  ]

  let body = '%PDF-1.4\n'
  const offsets: number[] = []
  objects.forEach((obj, i) => {
    offsets.push(body.length)
    body += `${i + 1} 0 obj\n${obj}\nendobj\n`
  })
  const xrefStart = body.length
  body += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`
  for (const off of offsets) {
    body += `${String(off).padStart(10, '0')} 00000 n \n`
  }
  body += `trailer\n<</Size ${objects.length + 1}/Root 1 0 R>>\nstartxref\n${xrefStart}\n%%EOF`
  return Buffer.from(body, 'latin1')
}
