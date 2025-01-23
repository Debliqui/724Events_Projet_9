function LastEvent(events, today) {
  return events.reduce((eventPrev, eventCurr) => {
    const prevDate = new Date(eventPrev.date);
    const currDate = new Date(eventCurr.date);
    return Math.abs(currDate - today) < Math.abs(prevDate - today)
      ? eventCurr
      : eventPrev;
  });
}
export default LastEvent;
