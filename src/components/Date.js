const converDate = date => {
  var date = new Date(date);
  var tahun = date.getFullYear();
  var bulan = date.getMonth();
  var tanggal = date.getDate();
  var hari = date.getDay();
  switch (hari) {
    case 0:
      hari = 'Minggu';
      break;
    case 1:
      hari = 'Senin';
      break;
    case 2:
      hari = 'Selasa';
      break;
    case 3:
      hari = 'Rabu';
      break;
    case 4:
      hari = 'Kamis';
      break;
    case 5:
      hari = "Jum'at";
      break;
    case 6:
      hari = 'Sabtu';
      break;
  }
  switch (bulan) {
    case 0:
      bulan = 'Januari';
      break;
    case 1:
      bulan = 'Februari';
      break;
    case 2:
      bulan = 'Maret';
      break;
    case 3:
      bulan = 'April';
      break;
    case 4:
      bulan = 'Mei';
      break;
    case 5:
      bulan = 'Juni';
      break;
    case 6:
      bulan = 'Juli';
      break;
    case 7:
      bulan = 'Agustus';
      break;
    case 8:
      bulan = 'September';
      break;
    case 9:
      bulan = 'Oktober';
      break;
    case 10:
      bulan = 'November';
      break;
    case 11:
      bulan = 'Desember';
      break;
  }
  return hari + ', ' + tanggal + ' ' + bulan + ' ' + tahun;
};
const convertDay = day => {
  let hari;
  switch (day) {
    case 0:
      hari = 'Minggu';
      break;
    case 1:
      hari = 'Senin';
      break;
    case 2:
      hari = 'Selasa';
      break;
    case 3:
      hari = 'Rabu';
      break;
    case 4:
      hari = 'Kamis';
      break;
    case 5:
      hari = "Jum'at";
      break;
    case 6:
      hari = 'Sabtu';
      break;
  }
  return hari;
};
const convertMonth = month => {
  let bulan;
  switch (month) {
    case 0:
      bulan = 'Januari';
      break;
    case 1:
      bulan = 'Februari';
      break;
    case 2:
      bulan = 'Maret';
      break;
    case 3:
      bulan = 'April';
      break;
    case 4:
      bulan = 'Mei';
      break;
    case 5:
      bulan = 'Juni';
      break;
    case 6:
      bulan = 'Juli';
      break;
    case 7:
      bulan = 'Agustus';
      break;
    case 8:
      bulan = 'September';
      break;
    case 9:
      bulan = 'Oktober';
      break;
    case 10:
      bulan = 'November';
      break;
    case 11:
      bulan = 'Desember';
      break;
  }
  return bulan;
};
const convertTime = time => {
  let tempTime = time.split(':');
  let tm = new Date();
  let result;
  tm.setHours(tempTime[0]);
  tm.setMinutes(tempTime[1]);
  tm.setSeconds(tempTime[2]);
  if (tempTime[0] == 0 && tempTime[1] == 0 && tempTime[2] == 0) {
    result = ' -';
  } else {
    result = tm.getHours() + ' Jam ' + tm.getMinutes() + ' Menit ';
  }
  return result;
};

const getTime = date => {
  return (
    (date.getHours() <= 9 ? '0' : '') +
    date.getHours() +
    '.' +
    (date.getMinutes() <= 9 ? '0' : '') +
    date.getMinutes()
  );
};
const getDate = date => {
  return (
    convertDay(date.getDay()) +
    ', ' +
    date.getDate() +
    ' ' +
    convertMonth(date.getMonth()) +
    ' ' +
    date.getFullYear()
  );
};

const getDateWDay = date => {
  return (
    date.getDate() +
    ' ' +
    convertMonth(date.getMonth()) +
    ' ' +
    date.getFullYear()
  );
};

const getAge = dateString => {
  var today = new Date();
  var birthDate = new Date(dateString);
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return '' + age;
};

export {
  getTime,
  getDate,
  getDateWDay,
  getAge,
  converDate,
  convertMonth,
  convertTime,
};
