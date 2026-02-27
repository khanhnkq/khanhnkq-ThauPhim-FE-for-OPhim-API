/** Parse language and episode badges from Ophim movie data */
export function parseBadges(lang?: string, episodeCurrent?: string) {
  const safeLang = (lang || '').toLowerCase();
  const isThuyetMinh = safeLang.includes('thuyết minh') || safeLang.includes('lồng tiếng');

  let langBadge = '';
  if (isThuyetMinh) {
    langBadge = 'TM';
  } else if (safeLang.includes('vietsub') || safeLang.includes('phụ đề')) {
    langBadge = 'P.Đề';
  } else if (lang) {
    langBadge = lang;
  }

  const isUpcoming =
    !episodeCurrent ||
    episodeCurrent.toLowerCase() === 'đang cập nhật' ||
    episodeCurrent.toLowerCase() === 'trailer';

  let epText = episodeCurrent || '';
  if (epText.toLowerCase().includes('tập')) {
    epText = epText.replace(/tap|tập/i, '').trim();
  }

  return { langBadge, isThuyetMinh, isUpcoming, epText };
}
