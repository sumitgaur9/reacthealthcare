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




// export function defaultDateDBFormat() {
//     return "1753-01-01 00:00:00";
//   }

//   export function ToDBDateFormat(input) {
//     if (input) {
//       if (input.length == 10) {
//         var dt = moment(input, 'DD/MM/YYYY').format('YYYY/MM/DD');
//         return dt;
//       }
//     }
//     if (this.isAbValidDate(input) == false) {
//       return this.defaultDateDBFormat();
//     }
//     if (input) {
//       var result = new Date(input);
//       if (result) {
//         return this.ToSpecificDateFormat(result, AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
//       }
//     }
//     return this.ToSpecificDateFormat(this.defaultDateDBFormat(), AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS);
//   }

//   export function defaultDateDispFormat() {
//     return "01/01/1753";
//   }


//   export function ToDisplayDateFormat(input) {
//     if (this.isAbValidDate(input) == false) {
//         return this.defaultDateDispFormat();//change 4/24/2017 for financial period
//     }
//     input = new Date(input);
//     if (input.length == 19) {
//         var dt1 = moment(input).add(0, 'day').format('L')
//         if (this.isAbValidDate(dt1)) {
//             return this.ToSpecificDateFormat(dt1, AppEnum.AbDateTimeType.DD_MM_YYYY);
//         }
//     }
//     var result = new Date(input);
//     if (result) {
//         return this.ToSpecificDateFormat(result, AppEnum.AbDateTimeType.DD_MM_YYYY);
//     }

//     return this.ToSpecificDateFormat(this.defaultDateDispFormat(), AppEnum.AbDateTimeType.DD_MM_YYYY);
// } //OK


// export function ToSpecificDateFormat(input, format) {
//     var result = input;
//     try {
//       switch (format) {
//         case AppEnum.AbDateTimeType.YYYY_MM_DD_HH_MM_SS:
//           result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
//           break;
//         case AppEnum.AbDateTimeType.MM_DD_YYYY_HH_mm_ss:
//           result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
//           break;
//         case AppEnum.AbDateTimeType.DD_MM_YYYY:
//           result = moment(input, 'DD/MM/YYYY').format('DD/MM/YYYY');
//           break;
//         case AppEnum.AbDateTimeType.DD_MM_YY:
//           result = moment(input, 'DD/MM/YYYY').format('dd/MM/yy');
//           break;
//         case AppEnum.AbDateTimeType.MM_DD_YYYY:
//           result = moment(input, 'DD/MM/YYYY').format('MM/dd/yyyy');
//           break;
//         case AppEnum.AbDateTimeType.YYYY_MM_DD:
//           result = moment(input, 'DD/MM/YYYY').format('YYYY-MM-DD');
//           break;

//       }
//     }
//     catch (err) {
//       result = this.defaultDateDispFormat();
//     }
//     return result;
//   }

//   export function isAbValidDate(input) {
//     //if ((new Date(input) != "Invalid Date") && !isNaN(new Date(input))) {  // to be correct
//     if (input != '') {

//       if (input == '1753-01-01 00:00:00') {
//         return false;
//       }
//       if (new Date(input).getMonth() != undefined) {
//         return true;
//       }
//       else {
//         return false;
//       }
//     }
//     else {
//       return false;
//     }
//   }
 