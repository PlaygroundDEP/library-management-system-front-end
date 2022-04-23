let txtName: HTMLInputElement = document.querySelector('#txt-name')!;
let txtEmail: HTMLInputElement = document.querySelector('#txt-email')!;
let txtContactNo: HTMLInputElement = document.querySelector('#txt-contact-number')!;
let txtAddress: HTMLInputElement = document.querySelector('#txt-address')!;
let btnRegister: HTMLButtonElement = document.querySelector('#btn-register')!;
let frnRegistration: HTMLFormElement = document.querySelector('#frm-register-members')!;

frnRegistration.addEventListener('submit' , (e)=>{
    e.preventDefault();

    let inputs: HTMLInputElement[] = [txtName, txtEmail, txtAddress];
    let invalidInputElm = inputs.find((input:HTMLInputElement)=>
        input.classList.contains('is-invalid') || input.value.length===0);

    if (invalidInputElm) {
        invalidInputElm.classList.add('is-invalid');
        invalidInputElm.focus();
        invalidInputElm.select();
        return;
    } else {
        let member = {
            name:txtName.value.trim(),
            email:txtEmail.value.trim(),
            address:txtAddress.value.trim(),
            contact:txtContactNo.value.trim()
        };
        let memberJson = JSON.stringify(member);

        console.log(memberJson);
    }

});

const validationListener = (evt:Event) => {
    if (evt.target instanceof HTMLInputElement) {
        let inputElm=evt.target;
        let regExp: RegExp;

        if (inputElm===txtName){
            regExp = /^[A-Za-z ]+$/;
        } else if (inputElm === txtEmail) {
            regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        } else if (inputElm === txtAddress) {
            regExp = /^[A-Za-z0-9 ,/-]+$/;
        } else {
            regExp = /^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$/;
        }

        inputElm.classList.remove('is-invalid', 'is-valid');
        if (regExp.test(inputElm.value.trim())){
            inputElm.classList.add('is-valid');
        }else{
            inputElm.classList.add('is-invalid');
        }
    }
}

txtName.addEventListener('input', validationListener);
txtEmail.addEventListener('input', validationListener);
txtAddress.addEventListener('input', validationListener);
txtContactNo.addEventListener('input', validationListener);