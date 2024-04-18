// ex. sleep(2000).then(() => { console.log('World!'); });
export default function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
