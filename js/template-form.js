const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbz5BdMsR7RikPPnbcSNMyO7U1da0qx4VOcvZc_h9j_g9zQ1cDQYyi3eXVCenaJX7NESHA/exec";

/* -----------------------------
   FILE → BASE64 CONVERTER
------------------------------*/
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const base64 = reader.result.split(",")[1];
            resolve(base64);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
    });
}

/* -----------------------------
   MAIN SUBMIT FUNCTION
------------------------------*/
async function submitTemplateForm() {

    const company = document.getElementById("company").value;
    const userRole = document.getElementById("userRole").value;
    const reportType = document.getElementById("reportType").value;
    const currentTool = document.getElementById("currentTool").value;
    const mainPain = document.getElementById("mainPain").value;
    const hasTemplate = document.getElementById("hasTemplate").value;

    const fileInput = document.getElementById("templateFile");
    const file = fileInput.files[0];

    let fileBase64 = null;
    let fileName = "";
    let fileType = "";

    /* -------------------------
       VALIDATION
    --------------------------*/
    if (!company) {
        alert("Please enter company name");
        return;
    }

    if (hasTemplate === "") {
        alert("Please select Yes or No for template");
        return;
    }

    /* -------------------------
       FILE HANDLING
    --------------------------*/
    if (file) {

        const allowed = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowed.includes(file.type)) {
            alert("Only PDF or DOCX files allowed!");
            return;
        }

        fileBase64 = await fileToBase64(file);
        fileName = file.name;
        fileType = file.type;
    }

    /* -------------------------
       PAYLOAD
    --------------------------*/
    const payload = {
        company,
        userRole,
        reportType,
        currentTool,
        mainPain,
        hasTemplate,

        file: fileBase64,
        fileName,
        fileType
    };

    /* -------------------------
       SEND TO GOOGLE APPS SCRIPT
    --------------------------*/
    try {

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        if (result.success) {
            alert("✅ Template saved successfully!");
            clearForm();
        } else {
            alert("❌ Error saving data");
            console.error(result.error);
        }

    } catch (err) {
        console.error(err);
        alert("Network error. Check console.");
    }
}

/* -----------------------------
   RESET FORM
------------------------------*/
function clearForm() {

    document.getElementById("company").value = "";
    document.getElementById("userRole").value = "";
    document.getElementById("reportType").value = "";
    document.getElementById("currentTool").value = "";
    document.getElementById("mainPain").value = "";
    document.getElementById("hasTemplate").value = "";
    document.getElementById("templateFile").value = "";
}
