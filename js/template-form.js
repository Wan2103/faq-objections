const form = document.getElementById("templateForm");

window.onload = loadForm;

function saveForm(){

    const structure = [];

    document
        .querySelectorAll(
            '.checkbox-grid input[type="checkbox"]:checked'
        )
        .forEach(item => {
            structure.push(item.value);
        });

    const data = {

        companyName:
            document.getElementById("companyName").value,

        contactPerson:
            document.getElementById("contactPerson").value,

        position:
            document.getElementById("position").value,

        email:
            document.getElementById("email").value,

        phone:
            document.getElementById("phone").value,

        reportName:
            document.getElementById("reportName").value,

        reportType:
            document.getElementById("reportType").value,

        existingTemplate:
            document.getElementById("existingTemplate").value,

        photosPerReport:
            document.getElementById("photosPerReport").value,

        captionsRequired:
            document.getElementById("captionsRequired").value,

        photoNumbering:
            document.getElementById("photoNumbering").value,

        beforeAfter:
            document.getElementById("beforeAfter").value,

        exportFormat:
            document.getElementById("exportFormat").value,

        notes:
            document.getElementById("notes").value,

        structure
    };

    localStorage.setItem(
        "templateCollection",
        JSON.stringify(data)
    );

    alert("Form saved successfully.");
}

function loadForm(){

    const saved =
        JSON.parse(
            localStorage.getItem("templateCollection")
        );

    if(!saved) return;

    Object.keys(saved).forEach(key => {

        const field =
            document.getElementById(key);

        if(field){
            field.value = saved[key];
        }

    });

    if(saved.structure){

        document
            .querySelectorAll(
                '.checkbox-grid input[type="checkbox"]'
            )
            .forEach(box => {

                if(
                    saved.structure.includes(
                        box.value
                    )
                ){
                    box.checked = true;
                }

            });

    }

}

function clearForm(){

    if(
        !confirm(
            "Clear all saved data?"
        )
    ) return;

    localStorage.removeItem(
        "templateCollection"
    );

    location.reload();
}

function printSummary(){

    saveForm();

    const data =
        JSON.parse(
            localStorage.getItem(
                "templateCollection"
            )
        );

    const html = `
    <html>
    <head>
        <title>Template Summary</title>

        <style>
            body{
                font-family:Arial;
                padding:40px;
            }

            h1{
                color:#1f4ea3;
            }

            p{
                margin:8px 0;
            }
        </style>
    </head>
    <body>

        <h1>Template Collection Summary</h1>

        <p><strong>Company:</strong> ${data.companyName}</p>
        <p><strong>Contact:</strong> ${data.contactPerson}</p>
        <p><strong>Position:</strong> ${data.position}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>

        <hr>

        <p><strong>Report Name:</strong> ${data.reportName}</p>
        <p><strong>Report Type:</strong> ${data.reportType}</p>
        <p><strong>Existing Template:</strong> ${data.existingTemplate}</p>

        <hr>

        <p><strong>Structure:</strong></p>
        <ul>
            ${data.structure.map(item =>
                `<li>${item}</li>`
            ).join("")}
        </ul>

        <hr>

        <p><strong>Photos Per Report:</strong> ${data.photosPerReport}</p>
        <p><strong>Captions Required:</strong> ${data.captionsRequired}</p>
        <p><strong>Photo Numbering:</strong> ${data.photoNumbering}</p>
        <p><strong>Before/After:</strong> ${data.beforeAfter}</p>

        <hr>

        <p><strong>Export Format:</strong> ${data.exportFormat}</p>

        <hr>

        <p><strong>Notes:</strong></p>
        <p>${data.notes}</p>

    </body>
    </html>
    `;

    const win = window.open("");

    win.document.write(html);

    win.document.close();

    win.print();
}

document
    .getElementById("saveBtn")
    .addEventListener("click", saveForm);

document
    .getElementById("printBtn")
    .addEventListener("click", printSummary);

document
    .getElementById("clearBtn")
    .addEventListener("click", clearForm);
