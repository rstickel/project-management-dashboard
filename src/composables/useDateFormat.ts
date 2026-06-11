import { computed } from 'vue';
import dayjs from 'dayjs';

export function useDateFormat(dateString: string | Date | undefined) {
  const format = (pattern = 'MMM D, YYYY') => {
    if (!dateString) return '';
    return dayjs(dateString).format(pattern);
  };

  const fromNow = () => {
    if (!dateString) return '';
    return dayjs(dateString).fromNow();
  };

  const isPast = computed(() => {
    if (!dateString) return false;
    return dayjs(dateString).isBefore(dayjs(), 'day');
  });

  const isToday = computed(() => {
    if (!dateString) return false;
    return dayjs(dateString).isSame(dayjs(), 'day');
  });

  const isTomorrow = computed(() => {
    if (!dateString) return false;
    return dayjs(dateString).isSame(dayjs().add(1, 'day'), 'day');
  });

  return {
    format,
    fromNow,
    isPast,
    isToday,
    isTomorrow
  };
}
