
function Validator(formSelector, _this) {
    var _this = this;

    function getParent(element, selector) {

        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }



    var formRules = {};
    var validatorRule = {
        required: function (value) {
            return value ? undefined : `Vui lòng nhập trường này`;
        },
        email: function (value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Vui lòng nhập email';
        },
        min: function (min) {
            return function (value) {
                return value.length >= min ? undefined : `Nhập ít nhất ${min}`;
            }
        }
    };
    //lấy ra form element form 
    var formElement = document.querySelector(formSelector);

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');

        for (var input of inputs) {
            var rules = input.getAttribute('rules').split('|');

            for (var rule of rules) {
                var ruleInfo
                var isRuleHasValue = rule.includes(':');
                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunc = validatorRule[rule];

                if (isRuleHasValue) {
                    ruleFunc = ruleFunc(ruleInfo[1]);
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunc);
                } else {
                    formRules[input.name] = [ruleFunc];
                }


                input.onblur = handleValidate;
                input.oninput = handleClearError;
                // lắng nghe sực kiện để validate
            }
            // thực hiện validate   
            function handleValidate(event) {
                var rules = formRules[event.target.name];

                var errorMassage;
                rules.some(function (rule) {
                    errorMassage = rule(event.target.value);
                    return errorMassage;
                });
                // nếu có lỗi hiển thị lỗi ra UI
                if (errorMassage) {
                    var formGroup = getParent(event.target, '.form-group');
                    if (formGroup) {
                        formGroup.classList.add('invalid');
                        var formMassage = formGroup.querySelector('.form-massage');
                        if (formMassage) {
                            formMassage.innerText = errorMassage;
                        }
                    }
                }
                return !errorMassage;

            }
            function handleClearError(event) {
                var formGroup = getParent(event.target, '.form-group');
                if (formGroup.classList.contains('invalid')) {
                    formGroup.classList.remove('invalid');
                    var formMassage = formGroup.querySelector('.form-massage');
                    if (formMassage) {
                        formMassage.innerText = '';
                    }
                }
            }
        }
    }
    // xử lí hành vi submit form
    formElement.onsubmit = function (event) {
        event.preventDefault();
        var inputs = formElement.querySelectorAll('[name][rules]');
        var isValid = true;
        for (var input of inputs) {
            if (!handleValidate({ target: input })) {
                isValid = false;
            }
        }
        // khi không có lỗi thì submit form
        if (isValid) {
            if (typeof _this.onSubmit === 'function') {
                var enableInputs = formElement.querySelectorAll('[name]');
                var formValue = Array.from(enableInputs).reduce(function (values, input) {
                    switch (input.type) {
                        case 'radio':
                            values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
                            break;
                        case 'checkbox':
                            // values[input.name] = formElement.querySelector('input[name="'+input.name+'"]:checked').value;
                            if (!input.matches(':checked')) return values;
                            if (!Array.isArray(values[input.name])) {
                                values[input.name] = [];
                            }
                            values[input.name].push(input.value);
                            break;
                        default:
                            values[input.name] = input.value
                    }
                    return values;
                }, {});
                _this.onSubmit(formValue);
            } else {
                // submit theo html
                formElement.submit();
            }
        }
    }
}