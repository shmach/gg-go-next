export function getActualEpochTime(): number {
  const nowInMilliseconds = Date.now();
  const epochTimeStamp = Math.floor(nowInMilliseconds / 1000);

  return epochTimeStamp;
}
