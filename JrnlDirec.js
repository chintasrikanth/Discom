var maxdate1 = ''; 
function CopyRight() {
    var directive = {}; // new JSON object
    directive.restrict = "EA";
    directive.template = "@CopyRight 2016-2017  {{Customer.CustomerName}}";
    return directive;
}
function jqdatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);

                });
            };         
            var options = {
                dateFormat: "dd/mm/yy",
                maxDate: $('#hdnsysdate').val(),
                autoSize: true,
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",
                onSelect: function (dateText) {
                    updateModel(dateText);
                    elem.removeClass("error").tooltip("destroy");
                }
            };

            elem.datepicker(options);
        }
    }

}
function currentWorkingdatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
           
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);

                });
            };
            var today = new Date();
            var options = {
                dateFormat: "dd/mm/yy",
                autoSize: true,
                changeMonth: true,
                changeYear: true,
                yearRange: "-100:+0",             
                onSelect: function (dateText) {
                    updateModel(dateText);
                    elem.removeClass("error").tooltip("destroy");
                }
            };

            elem.datepicker(options);
        }
    }

} 
function dobjqdatepicker() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, elem, attrs, ngModelCtrl) {
            var updateModel = function (dateText) {
                scope.$apply(function () {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var today = new Date();
            var options = {
                dateFormat: "dd/mm/yy",
                autoSize: true,
                changeMonth: true,
                changeYear: true,
                maxDate: '-1',
                yearRange: "-100:+0",
                onSelect: function (dateText) {
                    updateModel(dateText);
                }
            };

            elem.datepicker(options);
        }
    }

} 
function validate() {
    var validations = {
        // works
        alphabetical: /^([a-zA-Z]*(?=[^a-zA-Z]))./,

        // works
        alphanumeric: /^([a-zA-Z0-9]*(?=[^a-zA-Z0-9]))./,

        // doesn't work - need to negate?
        // taken from: http://stackoverflow.com/questions/354044/what-is-the-best-u-s-currency-regex
        currency: /(\.((?=[^\d])|\d{2}(?![^,\d.]))|,((?=[^\d])|\d{3}(?=[^,.$])|(?=\d{1,2}[^\d]))|\$(?=.)|\d{4,}(?=,)).|[^\d,.$]|^\$/,

        // doesn't work - need to negate?
        // taken from here: http://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
        date: /^(((0[1-9]|1[012])|(\d{2}\/\d{2}))(?=[^\/])|((\d)|(\d{2}\/\d{2}\/\d{1,3})|(.+\/))(?=[^\d])|\d{2}\/\d{2}\/\d{4}(?=.)).|^(1[3-9]|[2-9]\d)|((?!^)(3[2-9]|[4-9]\d)\/)|[3-9]\d{3}|2[1-9]\d{2}|(?!^)\/\d\/|^\/|[^\d/]/,

        // doesn't work - need to negate?
        // taken from: http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        email: /^([\w.$-]+\@[\w.]+(?=[^\w.])|[\w.$-]+\@(?=[^\w.-])|[\w.@-]+(?=[^\w.$@-])).$|\.(?=[^\w-@]).|[^\w.$@-]|^[^\w]|\.(?=@).|@(?=\.)./i,

        // works /^(\d*(?=[^\d]))./
        numeric: /^(\d*(?=[^\d]))./,
        numerictest: /^\d+([,.]\d+)?$/      ///^-?[0-9]*(?:\.[0-9]*)?$/

    };
    // works
    // numeric: /^(\d*(?=[^\d]))./


    return {
        require: 'ngModel',

        scope: {
            validate: '@'
        },
        link: function (scope, element, attrs, modelCtrl) {
            //alert("tr");
            var pattern = validations[scope.validate] || scope.validate;
            //modelCtrl.$parsers.push(function (inputValue) {
            //  var transformedInput = inputValue.replace(pattern, '$1');


            modelCtrl.$parsers.push(function (inputValue) {
                var transformedInput = inputValue.replace(pattern, '$1');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }
                return transformedInput;
            });
            // });



        }
    }
}
function allowDecimalNumbers() {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val();
                value = value.replace(/[^0-9\.]/g, '')
                var findsDot = new RegExp(/\./g)
                var containsDot = value.match(findsDot)
                if (containsDot != null && ([46, 110, 190].indexOf(event.which) > -1)) {
                    event.preventDefault();
                    return false;
                }
                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows  
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers  
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number  
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot  
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }

}
function OnlyNumber() {
    var directive = {};
    directive.restrict = "AE";
    directive.link = function (scope, elem, attr) {



        if (!$(elem).attr("min")) {
            $(elem).attr("min", 0);
        }
        function toIncreaseMaxLengthBy(elem) {
            var maxDecimalPoints = elem.data('maxDecimalPoints');
            return (1 + maxDecimalPoints);
        }
        var el = $(elem)[0];
        el.initMaxLength = elem.data('maxLength');
        el.maxDecimalPoints = elem.data('maxDecimalPoints');
        var checkPositive = function (elem, ev) {
            try {
                var el = $(elem)[0];
                if (el.value.indexOf('.') > -1) {
                    if (ev.charCode >= 48 && ev.charCode <= 57) {
                        if (el.value.indexOf('.') == el.value.length - toIncreaseMaxLengthBy(elem)) {
                            if (el.selectionStart > el.value.indexOf('.')) {
                                return false;
                            } else {
                                if (el.value.length == elem.data('maxLength')) {
                                    return false;
                                } else {
                                    return true;
                                }
                            }
                        } else {
                            if (el.selectionStart <= el.value.indexOf('.')) {
                                if (el.value.indexOf('.') == toIncreaseMaxLengthBy(elem)) {
                                    return false;
                                }
                            }
                        }
                    }
                } else {
                    if (el.value.length == elem.data('maxLength')) {
                        if (ev.charCode == 46) {
                            if (typeof el.maxDecimalPoints === 'undefined') {
                                return true;
                            } else {
                                if (el.selectionStart < el.value.length - el.maxDecimalPoints) {
                                    return false;
                                };
                            }
                            elem.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(elem));
                            return true;
                        } else if (ev.charCode >= 48 && ev.charCode <= 57) {
                            return false;
                        }
                    }
                    if (ev.charCode == 46) {
                        if (el.selectionStart < el.value.length - elem.data('maxDecimalPoints')) {
                            return false;
                        } else {
                            return true;
                        }
                    }
                }
                if (ev.charCode == 46) {
                    if (el.value.indexOf('.') > -1) {
                        return false;
                    } else {
                        return true;
                    }
                }
                if ((ev.charCode < 48 || ev.charCode > 57) && ev.charCode != 0) {
                    return false;
                }
            } catch (err) { }
        }
        var change_maxlength = function (elem, ev) {
            try {
                var el = $(elem)[0];
                if (el.value.indexOf('.') > -1) {
                    elem.data('maxLength', el.initMaxLength + toIncreaseMaxLengthBy(elem));
                }
                else {
                    if (elem.data('maxLength') == el.initMaxLength + toIncreaseMaxLengthBy(elem)) {
                        var dot_pos_past = el.selectionStart;
                        el.value = el.value.substring(0, dot_pos_past);
                    }
                    elem.data('maxLength', el.initMaxLength);
                }
            } catch (err) { }
        }
        $(elem).on("keypress", function () {
            return checkPositive(elem, event);
        })
        $(elem).on("input", function () {
            return change_maxlength(elem, event);
        })
    }



    return directive;
} 
function footerdiv() {
    var directive = {};
    directive.restrict = 'EA';

    directive.link = function (scope, element, attrs) {

        element.bind('click', function (e) {
            e.preventDefault();

            var selected = $("#DetEntTabs").tabs('option', 'active'); // => 0


            if (this.id == "btnMoveLeftTab") {
                if (selected >= 1) {
                    if (scope.model.DEClientDtls.ModeofHolding === '281' && selected === 2 && !scope.detdata.CorporateFlag) {

                        $("#DetEntTabs").tabs("option", "active", selected - 2);
                    }
                    else
                        $("#DetEntTabs").tabs("option", "active", selected - 1);
                }
            } else {
                if (scope.model.DEClientDtls.ModeofHolding === '281' && selected === 0 && !scope.detdata.CorporateFlag) {

                    $("#DetEntTabs").tabs("option", "active", selected + 2);
                }
                else
                    $("#DetEntTabs").tabs("option", "active", selected + 1);
            }



        });
    }


    return directive;

} 
function clearerror() {
    var directive = {};
    directive.restrict = 'EA';
    directive.link = function (scope, elm) {
        elm.on("keyup", function () {
            elm.removeClass("error").tooltip("destroy");
        });
    }
    return directive;
} 
function onlydigits() {
    var directive = {};
        directive.require= 'ngModel',
        directive.restrict= 'EA',            
           directive. link= function (scope, element, attr, ctrl) {
                function inputValue(val) {
                    if (val) {
                        var digits = val.replace(/[^0-9]/g, '');

                        if (digits !== val) {
                            ctrl.$setViewValue(digits);
                            ctrl.$render();
                        }
                        return parseInt(digits,10);
                    }
                    return undefined;
                }            
                ctrl.$parsers.push(inputValue);
            }
       
        return directive;
}
function validatedate()
{
    var validate = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
    var directive = {};
    directive.restrict= 'EA',
        directive. link= function (scope, elm) {
                elm.on("keyup", function () {
                    var isMatchRegex = validate.test(elm.val());
                    if (isMatchRegex || elm.val() == '') {
                        elm.data("title", "").removeClass("error").tooltip("destroy");
                    }
                    else if (isMatchRegex == false) {
                        elm.tooltip("destroy").data("title", 'Please enter valid Date.').addClass("error").tooltip();
                    }
                });
            }        
        return directive;
} 
function validatedecmial()
{
    var directive = {};
    directive.restrict= 'EA',   
       directive. link= function (scope, elm, attrs, ctrl) {
            elm.on('keydown', function (event) {
                var $input = $(this);
                var value = $input.val().replace(/[,\s]/, "");
                value = value.replace(/[^0-9\.]/g, '')
                $input.val(value);
                if (event.which == 64 || event.which == 16) {
                    // numbers  
                    return false;
                } if ([8, 13, 27, 37, 38, 39, 40, 110].indexOf(event.which) > -1) {
                    // backspace, enter, escape, arrows  
                    return true;
                } else if (event.which >= 48 && event.which <= 57) {
                    // numbers  
                    return true;
                } else if (event.which >= 96 && event.which <= 105) {
                    // numpad number  
                    return true;
                } else if ([46, 110, 190].indexOf(event.which) > -1) {
                    // dot and numpad dot  
                    return true;
                } else {
                    event.preventDefault();
                    return false;
                }
            });
        }
    }
function validnum() {
    var validatenum = /[^0-9\.,]/g;
    var directive = {};
    directive.restrict = 'EA',
        directive.link = function (scope, elm) {
            elm.on("keyup", function () {
                var isMatchRegex = validatenum.test(elm.val());
                if (isMatchRegex || elm.val() == '') {
                    elm.data("title", "").removeClass("error").tooltip("destroy");
                }
                else if (isMatchRegex == false) {
                    elm.tooltip("destroy").data("title", 'Please enter valid number.').addClass("error").tooltip();
                }
            });
        }
    return directive;
}
function clearerror() {
    var directive = {};
    directive.restrict = 'EA';
    directive.link = function (scope, elm) {
        elm.on("keyup", function () {
            elm.removeClass("error").tooltip("destroy");
        });
        elm.focus(function () {
            elm.removeClass("error").tooltip("destroy");
        });
    }
    return directive;
}