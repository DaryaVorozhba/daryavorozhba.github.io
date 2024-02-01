const isMeetingBeyondWorkday = (sw, ew, sm, md) => {
  const startW = sw.split(':');
  const endW = ew.split(':');
  const startM = sm.split(':');

  const swInMin = +startW[0] * 60 + +startW[1];
  const ewInMin = +endW[0] * 60 + +endW[1];
  const smInMin = +startM[0] * 60 + +startM[1];
  const emInMin = smInMin + md;

  if(smInMin >= swInMin && emInMin <= ewInMin) {
    return true;
  }
  return false;
};
window.console.log(isMeetingBeyondWorkday('8:00', '17:30', '08:00', 900));
