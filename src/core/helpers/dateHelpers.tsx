export const getTime = (date: string) =>
  new Date(date).toLocaleTimeString("ru-Ru", {
    hour: "2-digit",
    minute: "2-digit",
  });

export const getTimeByDuration = (date: string, duration: number) =>
  new Date(new Date(date).getTime() + duration * 60000).toLocaleTimeString(
    "ru-Ru",
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

export const getDurationTime = (duration: number) => {
  const hours = Math.trunc(duration / 60);
  const minutes = duration - hours * 60;
  return `${hours}ч ${minutes}м`;
};
