'use strict';

const W = 1920;
const H = 1080;

const COLORS = {
  ink: '#2d3440',
  muted: '#5f6a7e',
  muted2: '#778398',
  dark: '#4e5666',
  blue: '#8b9db6',
  barBg: '#e1e5ec',
  green: '#08a957',
  red: '#ef4d5d',
  greenBg: '#e8faed',
  redBg: '#fde8ea',
  yellow: '#fff8d8',
  gray: '#f0f2f5',
  violet: '#f3ddfb',
  light: '#e7eaf0',
  white: '#ffffff',
  chartLight: '#e1e5eb',
  chartMid: '#aeb9c9',
  chartDark: '#8799b2',
};

const DEFAULTS = {
  1: {
    period: '1–7 июля 2026 (1 неделя)',
    totalTrips: 2.8,
    previousPeriod: '24–30 июня',
    previousTrips: 2.6,
    yandexTrips: 980,
    yandexPrevious: 920,
    whooshTrips: 910,
    whooshPrevious: 870,
    urentTrips: 910,
    urentPrevious: 930,
    yandexMos: 640,
    yandexNoMos: 340,
    whooshMos: 585,
    whooshNoMos: 325,
    urentMos: 555,
    urentNoMos: 355,
    seasonStart: 60,
    quotaYandex: 20,
    quotaWhoosh: 20,
    quotaUrent: 20,
    actualYandex: 18,
    actualWhoosh: 19,
    actualUrent: 18,
    excludedYandex: 2,
    excludedWhoosh: 1,
    excludedUrent: 2,
  },
  2: {
    period: '29 июня – 12 июля 2026 (2 недели)',
    accidents: 34,
    previousPeriod: '15–28 июня',
    previousAccidents: 31,
    yandexAccidents: 12,
    whooshAccidents: 11,
    urentAccidents: 11,
    totalRate: 1.63,
    previousRate: 0.81,
    yandexRate: 1.21,
    yandexPreviousRate: 1.08,
    whooshRate: 1.47,
    whooshPreviousRate: 1.31,
    urentRate: 1.56,
    urentPreviousRate: 1.42,
    minorYandex: 14,
    minorWhoosh: 11,
    minorUrent: 8,
    doubleYandex: 18,
    doubleWhoosh: 13,
    doubleUrent: 10,
    dismountYandex: 6,
    dismountWhoosh: 4,
    dismountUrent: 3,
    parkingYandex: 25,
    parkingWhoosh: 21,
    parkingUrent: 17,
    raidsSeason: 86,
    raidsPeriod: 12,
    blockedTotal: 254,
    blockedAdded: 38,
    finesTotal: 189,
    finesAdded: 27,
  },
  3: {
    casesTotal: 54,
    recovered: 1480,
    won: 8,
    lost: 3,
    pending: 43,
    yandexCases: 22,
    whooshCases: 18,
    urentCases: 14,
    month1: 'май',
    month2: 'июнь',
    month3: 'июль',
    claims1: 10,
    claims2: 28,
    claims3: 6,
    wins1: 0,
    wins2: 5,
    wins3: 3,
  },
};

const SCHEMAS = {
  1: [
    group('Шапка и поездки', [
      textField('period', 'Период'),
      numberField('totalTrips', 'Общее количество поездок, млн', 0.1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousTrips', 'Поездки в АППН, млн', 0.1, 'Процент и стрелка рассчитываются автоматически.'),
    ]),
    group('Поездки по операторам', [
      numberField('yandexTrips', 'Яндекс — текущий период, тыс.', 0.1),
      numberField('yandexPrevious', 'Яндекс — АППН, тыс.', 0.1),
      numberField('whooshTrips', 'Whoosh — текущий период, тыс.', 0.1),
      numberField('whooshPrevious', 'Whoosh — АППН, тыс.', 0.1),
      numberField('urentTrips', 'Юрент — текущий период, тыс.', 0.1),
      numberField('urentPrevious', 'Юрент — АППН, тыс.', 0.1, 'Цвет и направление стрелки определяются по текущему и прошлому значениям.'),
    ]),
    group('Mos ID', [
      numberField('yandexMos', 'Яндекс — поездки с Mos ID, тыс.', 0.1),
      numberField('yandexNoMos', 'Яндекс — поездки без Mos ID, тыс.', 0.1),
      numberField('whooshMos', 'Whoosh — поездки с Mos ID, тыс.', 0.1),
      numberField('whooshNoMos', 'Whoosh — поездки без Mos ID, тыс.', 0.1),
      numberField('urentMos', 'Юрент — поездки с Mos ID, тыс.', 0.1),
      numberField('urentNoMos', 'Юрент — поездки без Mos ID, тыс.', 0.1, 'Доли и ширина полос рассчитываются автоматически.'),
    ]),
    group('Квота', [
      numberField('seasonStart', 'Парк в начале сезона, тыс.', 0.1),
      numberField('quotaYandex', 'Согласованная квота — Яндекс, тыс.', 0.1),
      numberField('quotaWhoosh', 'Согласованная квота — Whoosh, тыс.', 0.1),
      numberField('quotaUrent', 'Согласованная квота — Юрент, тыс.', 0.1),
      numberField('actualYandex', 'Фактический парк — Яндекс, тыс.', 0.1),
      numberField('actualWhoosh', 'Фактический парк — Whoosh, тыс.', 0.1),
      numberField('actualUrent', 'Фактический парк — Юрент, тыс.', 0.1),
      numberField('excludedYandex', 'Исключённый парк — Яндекс, тыс.', 0.1),
      numberField('excludedWhoosh', 'Исключённый парк — Whoosh, тыс.', 0.1),
      numberField('excludedUrent', 'Исключённый парк — Юрент, тыс.', 0.1, 'Итоговые значения в строках складываются автоматически.'),
    ]),
  ],
  2: [
    group('ДТП', [
      textField('period', 'Период'),
      numberField('accidents', 'ДТП за 2 недели', 1),
      textField('previousPeriod', 'Период АППН'),
      numberField('previousAccidents', 'ДТП в АППН', 1, 'Рост ДТП показывается красной стрелкой вверх, снижение — зелёной вниз.'),
      numberField('yandexAccidents', 'Яндекс — ДТП', 1),
      numberField('whooshAccidents', 'Whoosh — ДТП', 1),
      numberField('urentAccidents', 'Юрент — ДТП', 1, 'Доли операторов рассчитываются от общего количества ДТП.'),
    ]),
    group('ДТП на 100 тыс. поездок', [
      numberField('totalRate', 'Общий показатель', 0.01),
      numberField('previousRate', 'Общий показатель АППН', 0.01),
      numberField('yandexRate', 'Яндекс — показатель', 0.01),
      numberField('yandexPreviousRate', 'Яндекс — АППН', 0.01),
      numberField('whooshRate', 'Whoosh — показатель', 0.01),
      numberField('whooshPreviousRate', 'Whoosh — АППН', 0.01),
      numberField('urentRate', 'Юрент — показатель', 0.01),
      numberField('urentPreviousRate', 'Юрент — АППН', 0.01),
    ]),
    group('Нарушения — несовершеннолетние', [
      numberField('minorYandex', 'Яндекс', 1),
      numberField('minorWhoosh', 'Whoosh', 1),
      numberField('minorUrent', 'Юрент', 1),
    ]),
    group('Нарушения — поездки вдвоём', [
      numberField('doubleYandex', 'Яндекс', 1),
      numberField('doubleWhoosh', 'Whoosh', 1),
      numberField('doubleUrent', 'Юрент', 1),
    ]),
    group('Нарушения — неспешивание', [
      numberField('dismountYandex', 'Яндекс', 1),
      numberField('dismountWhoosh', 'Whoosh', 1),
      numberField('dismountUrent', 'Юрент', 1),
    ]),
    group('Нарушения — парковка', [
      numberField('parkingYandex', 'Яндекс', 1),
      numberField('parkingWhoosh', 'Whoosh', 1),
      numberField('parkingUrent', 'Юрент', 1, 'Итоги по строкам и операторам рассчитываются автоматически.'),
    ]),
    group('Рейды и меры', [
      numberField('raidsSeason', 'Рейды с начала сезона', 1),
      numberField('raidsPeriod', 'Рейды за 2 недели', 1),
      numberField('blockedTotal', 'Заблокировано пользователей — всего', 1),
      numberField('blockedAdded', 'Заблокировано за период', 1),
      numberField('finesTotal', 'Выставлено штрафов — всего', 1),
      numberField('finesAdded', 'Штрафов за период', 1),
    ]),
  ],
  3: [
    group('Основные показатели', [
      numberField('casesTotal', 'Всего судебных дел', 1),
      numberField('recovered', 'Взыскано, тыс. рублей', 1),
      numberField('won', 'Выиграно со взысканием', 1),
      numberField('lost', 'Проиграно сервисами', 1),
      numberField('pending', 'На рассмотрении', 1),
    ]),
    group('Разбивка по операторам', [
      numberField('yandexCases', 'Яндекс — дел', 1),
      numberField('whooshCases', 'Whoosh — дел', 1),
      numberField('urentCases', 'Юрент — дел', 1),
    ]),
    group('Подписи месяцев', [
      textField('month1', 'Месяц 1'),
      textField('month2', 'Месяц 2'),
      textField('month3', 'Месяц 3'),
    ]),
    group('Поданные исковые заявления', [
      numberField('claims1', 'Месяц 1', 1),
      numberField('claims2', 'Месяц 2', 1),
      numberField('claims3', 'Месяц 3', 1),
    ]),
    group('Выигранные дела', [
      numberField('wins1', 'Месяц 1', 1),
      numberField('wins2', 'Месяц 2', 1),
      numberField('wins3', 'Месяц 3', 1, 'Высота столбцов и подписи значений пересчитываются автоматически.'),
    ]),
  ],
};

const SLIDES = {
  1: { title: 'Основные показатели', background: './assets/slide-1-bg.png' },
  2: { title: 'Показатели аварийности', background: './assets/slide-2-bg.png' },
  3: { title: 'Суды операторов аренды с пользователями', background: './assets/slide-3-bg.png' },
};

const state = {
  activeSlide: 1,
  reportId: localStorage.getItem('sim-report:report-id') || 'sim-report-2026',
  data: {},
  images: {},
  fontReady: false,
  renderQueued: false,
};

const canvas = document.getElementById('report-canvas');
const ctx = canvas.getContext('2d', { alpha: false });

function group(title, fields) { return { title, fields }; }
function textField(key, label, hint = '') { return { key, label, type: 'text', hint }; }
function numberField(key, label, step = 1, hint = '') { return { key, label, type: 'number', step, hint }; }

function deepClone(value) { return JSON.parse(JSON.stringify(value)); }

function slideStorageKey(slideId) {
  return `sim-report:${state.reportId}:slide:${slideId}`;
}

function loadInitialData() {
  for (const id of [1, 2, 3]) {
    const saved = localStorage.getItem(slideStorageKey(id));
    state.data[id] = saved ? { ...deepClone(DEFAULTS[id]), ...safeJson(saved) } : deepClone(DEFAULTS[id]);
  }
}

function safeJson(text) {
  try { return JSON.parse(text); } catch { return {}; }
}

function saveLocal(slideId) {
  localStorage.setItem(slideStorageKey(slideId), JSON.stringify(state.data[slideId]));
}

function n(value, fallback = 0) {
  const number = typeof value === 'number' ? value : Number(String(value).replace(',', '.'));
  return Number.isFinite(number) ? number : fallback;
}

function sum(...values) { return values.reduce((acc, value) => acc + n(value), 0); }

function pct(current, previous) {
  const prev = n(previous);
  if (!prev) return 0;
  return ((n(current) - prev) / prev) * 100;
}

function share(part, total) {
  const all = n(total);
  return all ? (n(part) / all) * 100 : 0;
}

function fmt(value, digits = null) {
  const number = n(value);
  let useDigits = digits;
  if (useDigits === null) {
    useDigits = Number.isInteger(number) ? 0 : Math.min(2, decimalPlaces(number));
  }
  return number.toLocaleString('ru-RU', {
    minimumFractionDigits: useDigits,
    maximumFractionDigits: useDigits,
    useGrouping: true,
  });
}

function decimalPlaces(value) {
  const text = String(value);
  return text.includes('.') ? text.length - text.indexOf('.') - 1 : 0;
}

function compactPercent(value) {
  const abs = Math.abs(n(value));
  const digits = abs < 10 && !Number.isInteger(abs) ? 1 : 0;
  return fmt(abs, digits);
}

function font(size, weight = 400) {
  return `${weight} ${size}px "Moscow Sans", Arial, sans-serif`;
}

function setFont(size, weight = 400) {
  ctx.font = font(size, weight);
  ctx.textBaseline = 'middle';
}

function drawText(text, x, y, options = {}) {
  const {
    size = 30,
    weight = 400,
    color = COLORS.ink,
    align = 'left',
    baseline = 'middle',
    maxWidth,
  } = options;
  ctx.save();
  ctx.font = font(size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  if (maxWidth) ctx.fillText(String(text), x, y, maxWidth);
  else ctx.fillText(String(text), x, y);
  ctx.restore();
}

function fitText(text, box, options = {}) {
  const { size = 32, minSize = 14, weight = 400, color = COLORS.ink, align = 'center' } = options;
  let fontSize = size;
  ctx.save();
  while (fontSize > minSize) {
    ctx.font = font(fontSize, weight);
    if (ctx.measureText(String(text)).width <= box.w) break;
    fontSize -= 1;
  }
  ctx.restore();
  const x = align === 'center' ? box.x + box.w / 2 : align === 'right' ? box.x + box.w : box.x;
  drawText(text, x, box.y + box.h / 2, { size: fontSize, weight, color, align });
}

function roundedPath(x, y, w, h, radius) {
  const r = Math.min(radius, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function roundedRect(x, y, w, h, radius, fill, stroke = null, lineWidth = 1) {
  ctx.save();
  roundedPath(x, y, w, h, radius);
  if (fill) { ctx.fillStyle = fill; ctx.fill(); }
  if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = lineWidth; ctx.stroke(); }
  ctx.restore();
}

function drawMetric(main, suffix, box, options = {}) {
  const {
    mainSize = 60,
    suffixSize = 28,
    mainWeight = 700,
    suffixWeight = 700,
    color = COLORS.ink,
    gap = 14,
    align = 'center',
  } = options;
  ctx.save();
  ctx.textBaseline = 'middle';
  ctx.font = font(mainSize, mainWeight);
  const mainWidth = ctx.measureText(String(main)).width;
  ctx.font = font(suffixSize, suffixWeight);
  const suffixWidth = ctx.measureText(String(suffix)).width;
  const total = mainWidth + gap + suffixWidth;
  let startX = box.x + (box.w - total) / 2;
  if (align === 'left') startX = box.x;
  if (align === 'right') startX = box.x + box.w - total;
  drawText(main, startX, box.y + box.h / 2, { size: mainSize, weight: mainWeight, color });
  drawText(suffix, startX + mainWidth + gap, box.y + box.h / 2 + 7, { size: suffixSize, weight: suffixWeight, color });
  ctx.restore();
}

function drawDeltaPill(current, previous, box, options = {}) {
  const { prefix = 'АППН ', unit = '', positiveGood = true, size = 22 } = options;
  const delta = pct(current, previous);
  const up = delta > 0.0001;
  const down = delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const bg = good ? COLORS.greenBg : bad ? COLORS.redBg : COLORS.light;
  roundedRect(box.x, box.y, box.w, box.h, box.h / 2, bg);
  const prevText = `${prefix}${fmt(previous)}${unit}`;
  const indicator = up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  ctx.save();
  ctx.font = font(size, 500);
  const a = ctx.measureText(prevText).width;
  ctx.font = font(size, 500);
  const b = ctx.measureText(indicator).width;
  const total = a + 8 + b;
  const start = box.x + (box.w - total) / 2;
  drawText(prevText, start, box.y + box.h / 2 + 1, { size, weight: 500, color: COLORS.muted2 });
  drawText(indicator, start + a + 8, box.y + box.h / 2 + 1, { size, weight: 500, color });
  ctx.restore();
}

function drawSimpleDelta(current, previous, box, positiveGood = true, size = 24) {
  const delta = pct(current, previous);
  const up = delta > 0.0001;
  const down = delta < -0.0001;
  const good = positiveGood ? up : down;
  const bad = positiveGood ? down : up;
  const color = good ? COLORS.green : bad ? COLORS.red : COLORS.muted2;
  const indicator = up ? `▲ ${compactPercent(delta)}%` : down ? `▼ ${compactPercent(delta)}%` : '• 0%';
  fitText(indicator, box, { size, minSize: 16, weight: 500, color, align: 'center' });
}

function drawMosBar(withMos, withoutMos, y) {
  const x = 1042;
  const width = 794;
  const height = 35;
  const total = Math.max(0, n(withMos) + n(withoutMos));
  const ratio = total ? Math.max(0, Math.min(1, n(withMos) / total)) : 0;
  const fillWidth = Math.max(0, width * ratio);
  roundedRect(x, y, width, height, 13, COLORS.barBg);
  ctx.save();
  roundedPath(x, y, width, height, 13);
  ctx.clip();
  ctx.fillStyle = COLORS.blue;
  ctx.fillRect(x, y, fillWidth, height);
  ctx.restore();

  drawText(`${fmt(ratio * 100, 0)}%`, x + 3, y - 18, { size: 23, weight: 500, color: COLORS.muted, align: 'left' });
  drawText(`${fmt((1 - ratio) * 100, 0)}%`, x + width - 3, y - 18, { size: 23, weight: 500, color: '#b9c0cd', align: 'right' });

  drawText(fmt(withMos, 1), x + 8, y + height / 2 + 1, { size: 24, weight: 500, color: COLORS.white });
  const rightX = Math.min(x + width - 8, x + fillWidth + 10);
  drawText(fmt(withoutMos, 1), rightX, y + height / 2 + 1, { size: 24, weight: 500, color: '#8490a3' });
}

function drawQuotaRow(y, values) {
  const total = sum(values[0], values[1], values[2]);
  drawMetric(fmt(total, Number.isInteger(total) ? 0 : 1), 'тыс.', { x: 930, y, w: 300, h: 84 }, { mainSize: 58, suffixSize: 28 });
  const cells = [
    { x: 1296, color: COLORS.yellow },
    { x: 1482, color: COLORS.gray },
    { x: 1669, color: COLORS.violet },
  ];
  cells.forEach((cell, index) => {
    roundedRect(cell.x, y + 3, 171, 81, 17, cell.color);
    drawMetric(fmt(values[index], Number.isInteger(n(values[index])) ? 0 : 1), 'тыс.', { x: cell.x + 8, y: y + 3, w: 155, h: 81 }, {
      mainSize: 35,
      suffixSize: 20,
      mainWeight: 500,
      suffixWeight: 700,
      color: COLORS.muted,
      gap: 7,
    });
  });
}

function drawViolationsCell(value, x, y, totalRow = false) {
  drawText(fmt(value, 0), x, y, { size: totalRow ? 30 : 34, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('нарушений', x, y + 29, { size: totalRow ? 17 : 18, weight: 500, color: totalRow ? COLORS.ink : '#8490a3', align: 'center' });
}

function drawChart(values, months, area) {
  const { x, y, w, h } = area;
  const baseline = y + h - 52;
  const top = y + 34;
  const plotHeight = baseline - top;
  const max = Math.max(...values.map(v => n(v)), 1);
  const centers = [x + w * 0.17, x + w * 0.5, x + w * 0.83];
  const colors = [COLORS.chartLight, COLORS.chartMid, COLORS.chartDark];
  const barWidth = 100;

  ctx.save();
  ctx.strokeStyle = '#cfd5dd';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 8, baseline + 0.5);
  ctx.lineTo(x + w - 8, baseline + 0.5);
  ctx.stroke();
  ctx.restore();

  values.forEach((raw, index) => {
    const value = Math.max(0, n(raw));
    const barHeight = value === 0 ? 0 : Math.max(4, (value / max) * plotHeight);
    const bx = centers[index] - barWidth / 2;
    const by = baseline - barHeight;
    if (barHeight > 0) {
      ctx.fillStyle = colors[index];
      ctx.fillRect(bx, by, barWidth, barHeight);
    }
    drawText(fmt(value, Number.isInteger(value) ? 0 : 1), centers[index], Math.max(top - 2, by - 17), {
      size: 29,
      weight: 500,
      color: COLORS.muted,
      align: 'center',
    });
    fitText(months[index], { x: centers[index] - 66, y: baseline + 15, w: 132, h: 38 }, {
      size: 24,
      minSize: 17,
      weight: 400,
      color: COLORS.muted,
      align: 'center',
    });
  });
}

async function renderSlide(slideId = state.activeSlide) {
  const image = state.images[slideId];
  if (!image) return;
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#e8ebf0';
  ctx.fillRect(0, 0, W, H);
  ctx.drawImage(image, 0, 0, W, H);
  ctx.imageSmoothingEnabled = true;
  if (slideId === 1) drawSlide1(state.data[1]);
  if (slideId === 2) drawSlide2(state.data[2]);
  if (slideId === 3) drawSlide3(state.data[3]);
}

function drawSlide1(d) {
  fitText(d.period, { x: 67, y: 20, w: 540, h: 61 }, { size: 37, minSize: 23, weight: 700, color: COLORS.white });

  drawMetric(fmt(d.totalTrips, 1), 'млн', { x: 105, y: 213, w: 230, h: 80 }, { mainSize: 64, suffixSize: 31 });
  fitText(d.previousPeriod, { x: 418, y: 253, w: 235, h: 46 }, { size: 26, minSize: 18, weight: 500, color: '#8491a6' });
  drawMetric(fmt(d.previousTrips, 1), 'млн', { x: 692, y: 247, w: 150, h: 55 }, {
    mainSize: 34,
    suffixSize: 31,
    mainWeight: 500,
    suffixWeight: 500,
    color: '#617087',
    gap: 8,
  });
  drawSimpleDelta(d.totalTrips, d.previousTrips, { x: 842, y: 248, w: 128, h: 54 }, true, 24);

  drawMetric(fmt(d.yandexTrips, 1), 'тыс.', { x: 130, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.whooshTrips, 1), 'тыс.', { x: 432, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });
  drawMetric(fmt(d.urentTrips, 1), 'тыс.', { x: 734, y: 390, w: 200, h: 70 }, { mainSize: 43, suffixSize: 27, mainWeight: 400, suffixWeight: 700, gap: 10 });

  drawDeltaPill(d.yandexTrips, d.yandexPrevious, { x: 94, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.whooshTrips, d.whooshPrevious, { x: 400, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });
  drawDeltaPill(d.urentTrips, d.urentPrevious, { x: 704, y: 472, w: 269, h: 38 }, { prefix: 'АППН ', unit: ' тыс.', positiveGood: true, size: 21 });

  drawMosBar(d.yandexMos, d.yandexNoMos, 275);
  drawMosBar(d.whooshMos, d.whooshNoMos, 375);
  drawMosBar(d.urentMos, d.urentNoMos, 473);

  // Маскируем фиксированное число 60 из фонового шаблона и рисуем редактируемое значение.
  ctx.fillStyle = COLORS.white;
  ctx.fillRect(125, 775, 350, 105);
  drawMetric(fmt(d.seasonStart, Number.isInteger(n(d.seasonStart)) ? 0 : 1), 'тыс. самокатов', { x: 140, y: 775, w: 330, h: 105 }, {
    mainSize: 60,
    suffixSize: 29,
    gap: 14,
  });

  drawQuotaRow(617, [d.quotaYandex, d.quotaWhoosh, d.quotaUrent]);
  drawQuotaRow(740, [d.actualYandex, d.actualWhoosh, d.actualUrent]);
  drawQuotaRow(865, [d.excludedYandex, d.excludedWhoosh, d.excludedUrent]);
}

function drawSlide2(d) {
  fitText(d.period, { x: 65, y: 20, w: 540, h: 61 }, { size: 36, minSize: 22, weight: 700, color: COLORS.white });

  drawText(fmt(d.accidents, 0), 200, 286, { size: 66, weight: 500, color: COLORS.muted, align: 'center' });
  const accidentDelta = pct(d.accidents, d.previousAccidents);
  const deltaUp = accidentDelta > 0.0001;
  const deltaDown = accidentDelta < -0.0001;
  const deltaText = deltaUp ? `▲ ${compactPercent(accidentDelta)}%` : deltaDown ? `▼ ${compactPercent(accidentDelta)}%` : '• 0%';
  const deltaColor = deltaUp ? COLORS.red : deltaDown ? COLORS.green : COLORS.muted2;
  fitText(deltaText, { x: 365, y: 220, w: 260, h: 90 }, { size: 47, minSize: 26, weight: 700, color: deltaColor });
  fitText(`АППН (${d.previousPeriod})`, { x: 370, y: 352, w: 250, h: 28 }, { size: 20, minSize: 14, weight: 500, color: '#8a94a6' });
  fitText(`${fmt(d.previousAccidents, 0)} ДТП`, { x: 397, y: 383, w: 195, h: 39 }, { size: 24, minSize: 17, weight: 500, color: '#657187' });

  const totalAccidents = Math.max(1, n(d.accidents));
  const operatorCards = [
    { count: d.yandexAccidents, x: 116, pillX: 198 },
    { count: d.whooshAccidents, x: 306, pillX: 388 },
    { count: d.urentAccidents, x: 495, pillX: 577 },
  ];
  operatorCards.forEach(card => {
    drawText(fmt(card.count, 0), card.x, 575, { size: 39, weight: 400, color: COLORS.ink, align: 'center' });
    roundedRect(card.pillX - 42, 553, 84, 40, 20, COLORS.light);
    drawText(`${fmt(share(card.count, totalAccidents), 0)}%`, card.pillX, 574, { size: 22, weight: 500, color: COLORS.muted, align: 'center' });
  });

  ctx.save();
  ctx.font = font(31, 700);
  const first = `${fmt(d.totalRate, 2)} ДТП`;
  const firstWidth = ctx.measureText(first).width;
  drawText(first, 87, 758, { size: 31, weight: 700, color: COLORS.ink });
  drawText(' на 100. тыс. поездок', 87 + firstWidth + 6, 758, { size: 29, weight: 700, color: COLORS.muted });
  ctx.restore();

  roundedRect(83, 791, 452, 31, 13, COLORS.light);
  fitText(`АППН (${d.previousPeriod}) – ${fmt(d.previousRate, 2)} ДТП`, { x: 90, y: 791, w: 438, h: 31 }, { size: 22, minSize: 15, weight: 500, color: '#778398' });

  const rateCols = [
    { value: d.yandexRate, prev: d.yandexPreviousRate, x: 169, prevX: 158 },
    { value: d.whooshRate, prev: d.whooshPreviousRate, x: 358, prevX: 348 },
    { value: d.urentRate, prev: d.urentPreviousRate, x: 548, prevX: 538 },
  ];
  rateCols.forEach(item => {
    drawText(fmt(item.value, 2), item.x, 866, { size: 31, weight: 500, color: COLORS.muted, align: 'center' });
    drawText(`АППН – ${fmt(item.prev, 2)}`, item.prevX, 911, { size: 18, weight: 500, color: '#778398', align: 'center' });
  });

  const categories = [
    [d.minorYandex, d.minorWhoosh, d.minorUrent],
    [d.doubleYandex, d.doubleWhoosh, d.doubleUrent],
    [d.dismountYandex, d.dismountWhoosh, d.dismountUrent],
    [d.parkingYandex, d.parkingWhoosh, d.parkingUrent],
  ];
  const rowY = [286, 378, 469, 560];
  const colX = [1131, 1328, 1524, 1725];
  categories.forEach((values, row) => {
    const rowTotal = sum(...values);
    [values[0], values[1], values[2], rowTotal].forEach((value, col) => drawViolationsCell(value, colX[col], rowY[row], false));
  });
  const totals = [
    sum(d.minorYandex, d.doubleYandex, d.dismountYandex, d.parkingYandex),
    sum(d.minorWhoosh, d.doubleWhoosh, d.dismountWhoosh, d.parkingWhoosh),
    sum(d.minorUrent, d.doubleUrent, d.dismountUrent, d.parkingUrent),
  ];
  drawViolationsCell(totals[0], colX[0], 654, true);
  drawViolationsCell(totals[1], colX[1], 654, true);
  drawViolationsCell(totals[2], colX[2], 654, true);
  drawViolationsCell(sum(...totals), colX[3], 654, true);

  drawMetric(fmt(d.raidsSeason, 0), 'ед.', { x: 690, y: 786, w: 245, h: 82 }, { mainSize: 65, suffixSize: 38, color: COLORS.muted });
  drawMetric(fmt(d.raidsPeriod, 0), 'ед.', { x: 975, y: 786, w: 230, h: 82 }, { mainSize: 65, suffixSize: 38, color: COLORS.ink });
  drawText(`${fmt(d.blockedTotal, 0)} (+${fmt(d.blockedAdded, 0)})`, 1269, 846, { size: 39, weight: 500, color: COLORS.muted });
  drawText(`${fmt(d.finesTotal, 0)} (+${fmt(d.finesAdded, 0)})`, 1269, 947, { size: 39, weight: 500, color: COLORS.muted });
}

function drawSlide3(d) {
  drawText(fmt(d.casesTotal, 0), 241, 256, { size: 68, weight: 500, color: COLORS.ink, align: 'center' });
  drawText(fmt(d.recovered, 0), 241, 483, { size: 55, weight: 500, color: COLORS.ink, align: 'center' });
  drawText('тыс. рублей', 241, 531, { size: 23, weight: 700, color: COLORS.muted, align: 'center' });

  const mainRows = [
    { value: d.won, y: 718 },
    { value: d.lost, y: 796 },
    { value: d.pending, y: 874 },
  ];
  mainRows.forEach(row => {
    roundedRect(94, row.y, 141, 62, 11, COLORS.light);
    drawText(fmt(row.value, 0), 164.5, row.y + 31, { size: 47, weight: 500, color: '#657187', align: 'center' });
  });

  drawText(fmt(d.yandexCases, 0), 1028, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText('дел', 1028, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.whooshCases, 0), 1328, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText('дел', 1328, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });
  drawText(fmt(d.urentCases, 0), 1628, 300, { size: 55, weight: 400, color: COLORS.ink, align: 'center' });
  drawText('дел', 1628, 352, { size: 27, weight: 400, color: COLORS.muted, align: 'center' });

  const months = [d.month1, d.month2, d.month3];
  drawChart([d.claims1, d.claims2, d.claims3], months, { x: 821, y: 540, w: 464, h: 421 });
  drawChart([d.wins1, d.wins2, d.wins3], months, { x: 1377, y: 540, w: 464, h: 421 });
}

function queueRender() {
  if (state.renderQueued) return;
  state.renderQueued = true;
  requestAnimationFrame(async () => {
    state.renderQueued = false;
    await renderSlide();
  });
}

function renderEditor() {
  const container = document.getElementById('editor-form');
  const schema = SCHEMAS[state.activeSlide];
  const data = state.data[state.activeSlide];
  container.innerHTML = schema.map((section, sectionIndex) => `
    <details class="form-group" ${sectionIndex < 2 ? 'open' : ''}>
      <summary>${escapeHtml(section.title)}</summary>
      <div class="form-group__body">
        ${section.fields.map(field => `
          <div class="field-row">
            <label for="field-${field.key}">${escapeHtml(field.label)}</label>
            <input
              id="field-${field.key}"
              data-field-key="${field.key}"
              type="${field.type}"
              ${field.type === 'number' ? `step="${field.step}" inputmode="decimal"` : ''}
              value="${escapeHtml(data[field.key] ?? '')}"
              autocomplete="off"
            />
            ${field.hint ? `<small>${escapeHtml(field.hint)}</small>` : ''}
          </div>
        `).join('')}
      </div>
    </details>
  `).join('');

  container.querySelectorAll('[data-field-key]').forEach(input => {
    input.addEventListener('input', event => {
      const field = findField(state.activeSlide, event.target.dataset.fieldKey);
      state.data[state.activeSlide][field.key] = field.type === 'number'
        ? (event.target.value === '' ? 0 : Number(event.target.value))
        : event.target.value;
      saveLocal(state.activeSlide);
      queueRender();
    });
  });
}

function findField(slideId, key) {
  for (const section of SCHEMAS[slideId]) {
    const field = section.fields.find(item => item.key === key);
    if (field) return field;
  }
  return { key, type: 'text' };
}

function switchSlide(id) {
  state.activeSlide = Number(id);
  document.querySelectorAll('.slide-tab').forEach(button => {
    button.classList.toggle('is-active', Number(button.dataset.slideId) === state.activeSlide);
  });
  document.getElementById('slide-title').textContent = SLIDES[state.activeSlide].title;
  document.getElementById('editor-title').textContent = `Данные слайда ${state.activeSlide}`;
  document.getElementById('save-slide').textContent = `Сохранить слайд ${state.activeSlide}`;
  document.getElementById('load-slide').textContent = `Обновить слайд ${state.activeSlide}`;
  document.getElementById('download-slide').textContent = `Скачать PNG ${state.activeSlide}`;
  renderEditor();
  queueRender();
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function downloadCurrentSlide() {
  renderSlide().then(() => {
    const link = document.createElement('a');
    link.download = `${sanitizeFileName(state.reportId)}-slide-${state.activeSlide}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    link.click();
    showToast(`Слайд ${state.activeSlide} сохранён вместе с фоном`, 'success');
  });
}

async function downloadAllSlides() {
  const original = state.activeSlide;
  for (const id of [1, 2, 3]) {
    state.activeSlide = id;
    await renderSlide(id);
    const link = document.createElement('a');
    link.download = `${sanitizeFileName(state.reportId)}-slide-${id}.png`;
    link.href = canvas.toDataURL('image/png', 1);
    document.body.appendChild(link);
    link.click();
    link.remove();
    await wait(350);
  }
  state.activeSlide = original;
  await renderSlide(original);
  showToast('Три PNG подготовлены', 'success');
}

function sanitizeFileName(value) {
  return String(value || 'sim-report').replace(/[\\/:*?"<>|]+/g, '-').trim() || 'sim-report';
}

function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)); }

function getSupabaseSettings() {
  return {
    url: localStorage.getItem('sim-report:supabase-url') || '',
    key: localStorage.getItem('sim-report:supabase-key') || '',
    table: localStorage.getItem('sim-report:supabase-table') || 'sim_report_slides',
  };
}

function setConnectionStatus(message, connected = false) {
  const status = document.getElementById('connection-status');
  status.textContent = message;
  status.classList.toggle('is-connected', connected);
}

function isSupabaseConfigured() {
  const settings = getSupabaseSettings();
  return Boolean(settings.url && settings.key && settings.table);
}

function supabaseHeaders(extra = {}) {
  const { key } = getSupabaseSettings();
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    'Content-Type': 'application/json',
    ...extra,
  };
}

function supabaseEndpoint(path = '') {
  const { url } = getSupabaseSettings();
  return `${url.replace(/\/$/, '')}/rest/v1/${path}`;
}

async function saveSlideRemote(slideId) {
  saveLocal(slideId);
  if (!isSupabaseConfigured()) {
    showToast('Слайд сохранён локально. Для облака заполните настройки Supabase.', 'success');
    return;
  }
  const { table } = getSupabaseSettings();
  const response = await fetch(`${supabaseEndpoint(table)}?on_conflict=report_id,slide_id`, {
    method: 'POST',
    headers: supabaseHeaders({ Prefer: 'resolution=merge-duplicates,return=representation' }),
    body: JSON.stringify([{
      report_id: state.reportId,
      slide_id: slideId,
      payload: state.data[slideId],
      updated_at: new Date().toISOString(),
    }]),
  });
  if (!response.ok) throw new Error(await readableSupabaseError(response));
  showToast(`Слайд ${slideId} сохранён в Supabase`, 'success');
  setConnectionStatus('Supabase подключён', true);
}

async function loadSlideRemote(slideId) {
  if (!isSupabaseConfigured()) {
    const saved = localStorage.getItem(slideStorageKey(slideId));
    state.data[slideId] = saved ? { ...deepClone(DEFAULTS[slideId]), ...safeJson(saved) } : deepClone(DEFAULTS[slideId]);
    renderEditor();
    queueRender();
    showToast('Данные обновлены из локального хранилища', 'success');
    return;
  }
  const { table } = getSupabaseSettings();
  const query = new URLSearchParams({
    report_id: `eq.${state.reportId}`,
    slide_id: `eq.${slideId}`,
    select: 'payload,updated_at',
    limit: '1',
  });
  const response = await fetch(`${supabaseEndpoint(table)}?${query.toString()}`, {
    headers: supabaseHeaders(),
  });
  if (!response.ok) throw new Error(await readableSupabaseError(response));
  const rows = await response.json();
  if (!rows.length) {
    showToast('Для этого ID отчёта данных в Supabase пока нет', 'error');
    return;
  }
  state.data[slideId] = { ...deepClone(DEFAULTS[slideId]), ...(rows[0].payload || {}) };
  saveLocal(slideId);
  renderEditor();
  queueRender();
  showToast(`Слайд ${slideId} обновлён из Supabase`, 'success');
  setConnectionStatus('Supabase подключён', true);
}

async function testSupabase() {
  if (!isSupabaseConfigured()) throw new Error('Заполните URL, anon key и название таблицы.');
  const { table } = getSupabaseSettings();
  const response = await fetch(`${supabaseEndpoint(table)}?select=slide_id&limit=1`, { headers: supabaseHeaders() });
  if (!response.ok) throw new Error(await readableSupabaseError(response));
  setConnectionStatus('Supabase подключён', true);
  showToast('Подключение к Supabase работает', 'success');
}

async function readableSupabaseError(response) {
  try {
    const body = await response.json();
    return body.message || body.hint || body.details || `Ошибка Supabase: ${response.status}`;
  } catch {
    return `Ошибка Supabase: ${response.status}`;
  }
}

function showToast(message, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.className = `toast is-visible ${type ? `is-${type}` : ''}`;
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => { toast.className = 'toast'; }, 3200);
}

function setBusy(button, busy) {
  if (!button) return;
  button.disabled = busy;
}

async function loadAssets() {
  const loading = document.getElementById('canvas-loading');
  try {
    const face = new FontFace('Moscow Sans', 'url(./assets/moscow-sans-regular.ttf)');
    const loadedFace = await face.load();
    document.fonts.add(loadedFace);
    await document.fonts.ready;
    state.fontReady = true;
  } catch (error) {
    console.warn('Moscow Sans could not be loaded, fallback will be used.', error);
  }

  await Promise.all([1, 2, 3].map(id => new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => { state.images[id] = image; resolve(); };
    image.onerror = () => reject(new Error(`Не удалось загрузить фон слайда ${id}`));
    image.src = SLIDES[id].background;
  })));
  loading.classList.add('is-hidden');
}

function bindUi() {
  const reportInput = document.getElementById('report-id');
  reportInput.value = state.reportId;
  reportInput.addEventListener('change', () => {
    state.reportId = reportInput.value.trim() || 'sim-report-2026';
    localStorage.setItem('sim-report:report-id', state.reportId);
    loadInitialData();
    renderEditor();
    queueRender();
    showToast(`Открыт отчёт ${state.reportId}`, 'success');
  });

  document.querySelectorAll('.slide-tab').forEach(button => {
    button.addEventListener('click', () => switchSlide(button.dataset.slideId));
  });

  document.getElementById('download-slide').addEventListener('click', downloadCurrentSlide);
  document.getElementById('download-all').addEventListener('click', downloadAllSlides);

  document.getElementById('reset-slide').addEventListener('click', () => {
    state.data[state.activeSlide] = deepClone(DEFAULTS[state.activeSlide]);
    saveLocal(state.activeSlide);
    renderEditor();
    queueRender();
    showToast('Пример восстановлен', 'success');
  });

  document.getElementById('save-slide').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await saveSlideRemote(state.activeSlide); }
    catch (error) { showToast(error.message, 'error'); setConnectionStatus('Ошибка Supabase', false); }
    finally { setBusy(button, false); }
  });

  document.getElementById('load-slide').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try { await loadSlideRemote(state.activeSlide); }
    catch (error) { showToast(error.message, 'error'); setConnectionStatus('Ошибка Supabase', false); }
    finally { setBusy(button, false); }
  });

  const settings = getSupabaseSettings();
  document.getElementById('supabase-url').value = settings.url;
  document.getElementById('supabase-key').value = settings.key;
  document.getElementById('supabase-table').value = settings.table;
  if (isSupabaseConfigured()) setConnectionStatus('Supabase настроен', true);

  document.getElementById('save-supabase-settings').addEventListener('click', () => {
    localStorage.setItem('sim-report:supabase-url', document.getElementById('supabase-url').value.trim());
    localStorage.setItem('sim-report:supabase-key', document.getElementById('supabase-key').value.trim());
    localStorage.setItem('sim-report:supabase-table', document.getElementById('supabase-table').value.trim() || 'sim_report_slides');
    setConnectionStatus(isSupabaseConfigured() ? 'Supabase настроен' : 'Локальный режим', isSupabaseConfigured());
    showToast('Настройки Supabase сохранены', 'success');
  });

  document.getElementById('test-supabase').addEventListener('click', async event => {
    const button = event.currentTarget;
    setBusy(button, true);
    try {
      localStorage.setItem('sim-report:supabase-url', document.getElementById('supabase-url').value.trim());
      localStorage.setItem('sim-report:supabase-key', document.getElementById('supabase-key').value.trim());
      localStorage.setItem('sim-report:supabase-table', document.getElementById('supabase-table').value.trim() || 'sim_report_slides');
      await testSupabase();
    } catch (error) {
      showToast(error.message, 'error');
      setConnectionStatus('Ошибка Supabase', false);
    } finally {
      setBusy(button, false);
    }
  });
}

async function init() {
  loadInitialData();
  bindUi();
  renderEditor();
  try {
    await loadAssets();
    await renderSlide();
  } catch (error) {
    document.getElementById('canvas-loading').textContent = error.message;
    showToast(error.message, 'error');
  }
}

init();
