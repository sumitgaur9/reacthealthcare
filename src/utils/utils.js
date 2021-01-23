import * as moment from 'moment';
import {AbDateTimeType } from "../constants/constants";
export function toBase64(file) {
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    })
};

export function getBase64(file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export function arrayBufferToBase64(buffer) {
    if(!buffer) {return} 

    var binary = '';
    var bytes = new Uint8Array(buffer);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/jpg;base64,' + window.btoa(binary);
}

 
export function ToDisplayDateFormat(input) {
    if (isAbValidDate(input) == false) {
        return defaultDateDispFormat();//change 4/24/2017 for financial period
    }
    input = new Date(input);
    if (input.length == 19) {
        var dt1 = moment(input).add(0, 'day').format('L')
        if (isAbValidDate(dt1)) {
            return ToSpecificDateFormat(dt1, AbDateTimeType.DD_MM_YYYY);
        }
    }
    var result = new Date(input);
    if (result) {
        return ToSpecificDateFormat(result, AbDateTimeType.DD_MM_YYYY);
    }

    return ToSpecificDateFormat(defaultDateDispFormat(), AbDateTimeType.DD_MM_YYYY);
} //OK

export function defaultDateDispFormat() {
    return "01/01/1753";
  }
 
export function isAbValidDate(input) {
    //if ((new Date(input) != "Invalid Date") && !isNaN(new Date(input))) {  // to be correct
    if (input != '') {

      if (input == '1753-01-01 00:00:00') {
        return false;
      }
      if (new Date(input).getMonth() != undefined) {
        return true;
      }
      else {
        return false;
      }
    }
    else {
      return false;
    }
  }

  export function ToSpecificDateFormat(input, format) {
    var result = input;
    try {
      switch (format) {
        case AbDateTimeType.YYYY_MM_DD_HH_MM_SS:
          result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
          break;
        case AbDateTimeType.MM_DD_YYYY_HH_mm_ss:
          result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
          break;
        case AbDateTimeType.DD_MM_YYYY:
          result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
          break;
        case AbDateTimeType.DD_MM_YY:
          result = moment(input, 'DD/MM/YYYY').format('dd/MM/yy');
          break;
        case AbDateTimeType.MM_DD_YYYY:
          result = moment(input, 'DD/MM/YYYY').format('MM/dd/yyyy');
          break;
        case AbDateTimeType.YYYY_MM_DD:
          result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
          break;

      }
    }
    catch (err) {
      result = defaultDateDispFormat();
    }
    return result;
  }
