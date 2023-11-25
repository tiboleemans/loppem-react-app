exports.validTemporaryStudent = () => {
  return {
    'student': {
      'language': 'english   ',
      'period': 'august   ',
      'firstName': 'Joske   ',
      'lastName': 'Vermeulen',
      'gender': 'boy',
      'birthdate': '2020-01-01',
    },
    'parent': {
      'language': 'nl',
      'firstName': 'Mario',
      'lastName': 'Vermeulen',
      'email': 'onsmario@gmail.fake.com',
      'relation': 'yes please',
      'street': 'Trammezandlei',
      'houseNr': '122',
      'busNr': '',

      'city': 'Schoten',
      'zipCode': '2900',
      'gsm': '0412/121212',
      'gsm2': '',
    },
    'school': {
      'name': 'école de test',
      'street': 'rue de test',
      'houseNr': '1',
      'busNr': '',
      'city': 'Bruxelles',
      'zip': '1000',
      'titleProf': 'Mr',
      'nameProf': 'François',
      'years': '6',
      'hours': '1',
      'immersion': 'true',
      'report': null,
    },
    'extra': {
      'referral': 'false',
      'contact': 'euhm',
      'additionalInfo': '<script>alert(\'test\')</script>',
      'foodInfo': 'Hoe meer hoe beter',
      'interest': 'Node.JS',
      'acceptPictures': false,
      'acceptTerms': true,
    }
  }
};

exports.validStudent = () => {
  return {
    'student': {
      'language': 'english   ',
      'period': 'august   ',
      'firstNameStudent': 'Joske   ',
      'lastNameStudent': 'Vermeulen',
      'gender': 'boy',
      'birthdate': '2020-01-01',
    },
    'parent': {
      'language': 'nl',
      'firstName': 'Mario',
      'lastName': 'Vermeulen',
      'email': 'onsmario@gmail.fake.com',
      'relation': 'yes please',
      'street': 'Trammezandlei',
      'houseNr': '122',
      'busNr': '',
      'city': 'Schoten',
      'zipCode': '2900',
      'gsm': '0412/121212',
      'gsm2': '',
    },
    'school': {
      'name': 'école de test',
      'street': 'rue de test',
      'houseNr': '1',
      'busNr': '',
      'city': 'Bruxelles',
      'zip': '1000',
      'titleProf': 'Mr',
      'nameProf': 'François',
      'years': '6',
      'hours': '1',
      'immersion': 'true',
      'report': null,
    },
    'extra': {
      'referral': 'false',
      'contact': 'euhm',
      'additionalInfo': '<script>alert(\'test\')</script>',
      'foodInfo': 'Hoe meer hoe beter',
      'interest': 'Node.JS',
      'acceptPictures': false,
      'acceptTerms': true,
    }
  };
}

exports.validPayment = {
  'studentId': 'REPLACE_ME',
  'paymentAmount': 1220.0,
  'paymentDate': '01-01-2020',
  'paymentComplete': true,
};
