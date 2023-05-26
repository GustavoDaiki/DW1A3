const masks = {
    cpf (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    },
  
    cnpj (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
    },
  
    phone (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
  
    cep (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1')
    },
  
    date (value) {
      return value
        .replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{2})(\d)/, '$1/$2')
        .replace(/(\/\d{4})\d+?$/, '$1')
    },
  }
  
  document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js
  
    $input.addEventListener('input', e => {
      e.target.value = masks[field](e.target.value)
    }, false)
  })


function validateCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');
  
    if (cpf.length !== 11) {
      return false;
    }
  
    if (/^(\d)\1+$/.test(cpf)) {
      return false;
    }
  
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cpf.charAt(9)) !== digit) {
      return false;
    }
  
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cpf.charAt(10)) !== digit) {
      return false;
    }
  
    return true;
  }
  
  function validateCNPJ(cnpj) {
    cnpj = cnpj.replace(/\D/g, '');
  
    if (cnpj.length !== 14) {
      return false;
    }
  
    if (/^(\d)\1+$/.test(cnpj)) {
      return false;
    }
  
    let sum = 0;
    let weight = 5;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight--;
      if (weight < 2) {
        weight = 9;
      }
    }
    let digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cnpj.charAt(12)) !== digit) {
      return false;
    }
  
    sum = 0;
    weight = 6;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * weight;
      weight--;
      if (weight < 2) {
        weight = 9;
      }
    }
    digit = 11 - (sum % 11);
    if (digit > 9) {
      digit = 0;
    }
    if (parseInt(cnpj.charAt(13)) !== digit) {
      return false;
    }
  
    return true;
  }
  
  function validatePhone(phone) {
    phone = phone.replace(/\D/g, '');
  
    if (phone.length !== 11) {
      return false;
    }
  
    return true;
  }
  
  function validateCEP(cep) {
    cep = cep.replace(/\D/g, '');
  
    if (cep.length !== 8) {
      return false;
    }
  
    const validCEPRegex = /^[0-9]{8}$/;
    if (!validCEPRegex.test(cep)) {
      return false;
    }
  
    return true;
  }
  
  
  function validateDate(date) {
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(date)) {
      return false;
    }
  
    const parts = date.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);
    const year = parseInt(parts[2], 10);
  
    const newDate = new Date(year, month - 1, day);
  
    if (
      newDate.getFullYear() !== year ||
      newDate.getMonth() !== month - 1 ||
      newDate.getDate() !== day
    ) {
      return false;
    }
  
    return true;
  }
  
  function validateField(field, value) {
    let isValid = true;
  
    if (field === 'cpf') {
      isValid = validateCPF(value);
    } else if (field === 'cnpj') {
      isValid = validateCNPJ(value);
    } else if (field === 'phone') {
      isValid = validatePhone(value);
    } else if (field === 'cep') {
      isValid = validateCEP(value);
    } else if (field === 'date') {
      isValid = validateDate(value);
    }
  
    const $input = document.querySelector(`input[data-js=${field}]`);
    if (isValid) {
      $input.classList.remove('error');
    } else {
      $input.classList.add('error');
    }
  }
  
  document.querySelectorAll('input').forEach($input => {
    const field = $input.dataset.js;
  
    $input.addEventListener('input', e => {
      const value = e.target.value;
      validateField(field, value);
    });
  });
  


