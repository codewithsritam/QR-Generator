const data = document.querySelector('#data');
const size = document.querySelector('#size');
const logo = document.querySelector("#logo");
const clearBtn = document.querySelector('#clear');
const marginSlider = document.querySelector('#margin');
const dot = document.querySelector('#dot');
const dotColor1Input = document.querySelector('#dot-color-1');
const dotColor2Input = document.querySelector('#dot-color-2');
const bgColorInput = document.querySelector('#bg-color');
const download = document.querySelector('#download');

const defaultImage = './sample-qr.png'; 

let op = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg",
    data: data.value,
    image: defaultImage,
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
            "type": "linear",
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#000000"
                },
                {
                    "offset": 1,
                    "color": "#000"
                }
            ]
        }
    },
    backgroundOptions: {
        color: "#fff",
    }

});

render();

size.addEventListener('input', e => {
    op.width = e.target.value * 10;
    op.height = e.target.value * 10;
    render();
})

data.addEventListener('keyup', e => {
    op.data = e.target.value;
    render();
});

marginSlider.addEventListener('input', e => {
    op.imageOptions = { margin: e.target.value };
    render();
});

dot.addEventListener('change', e => {
    qrCode.update({
        dotsOptions: { type: e.target.value}
    });
    render();
});

dotColor1Input.addEventListener('input', e => {
    op.dotsOptions.gradient.colorStops[0].color = e.target.value;
    render();
});
dotColor2Input.addEventListener('input', e => {
    op.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render();
});

bgColorInput.addEventListener('input', e => {
    op.backgroundOptions.color = e.target.value;
    render();
});

function render() {
    qrCode = new QRCodeStyling(op);
    let canvasEl = document.querySelector("#canvas");
    canvasEl.innerHTML = '';
    qrCode.append(canvasEl);
    canvasEl.nextElementSibling.innerHTML = `${op.width}px * ${op.height}px`;
}

function browse() {
    logo.click();
}
logo.addEventListener('change', e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = () => {
        op.image = reader.result;
        render();
    };
    reader.readAsDataURL(file);
})

clearBtn.addEventListener('click', e => {
    delete op.image;
    render();
})

download.addEventListener('click', e => {
    qrCode.download({ 
        name: data.value || 'QR', 
        extenstion: 'svg' 
    });
})