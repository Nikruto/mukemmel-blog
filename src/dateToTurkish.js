const months = [
  'Ocak',
  'Şubat',
  'Mart',
  'Nisan',
  'Mayıs',
  'Haziran',
  'Temmuz',
  'Ağustos',
  'Eylül',
  'Ekim',
  'Kasım',
  'Aralık'
];

module.exports = date => {
  if (isNaN(date.getTime())) return null;

  let res = `${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}`;
  return res;
};
