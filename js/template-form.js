
const SCRIPT_URL =
"https://script.google.com/macros/s/AKfycbyUDl4rBbGaXtJvMPwUQePQfDjJxX-ynczuPTcF2gQ7KJhFIjFpg0mq8r_Y9Bz5_wwuzQ/exec";

/* =========================
   CONVERT FILE TO BASE64
========================= */
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

/* =========================
   MAIN SUBMIT FUNCTION
========================= */
async function submitTemplateForm() {

    // -------------------------
    // GET FORM VALUES
    // -------------------------
    const company = document.getElementById("company").value;
    const userRole = document.getElementById("userRole").value;
    const reportType = document.getElementById("reportType").value;
    const currentTool = document.getElementById("currentTool").value;
    const mainPain = document.getElementById("mainPain").value;
    const hasTemplate = document.getElementById("hasTemplate").value;

    const fileInput = document.getElementById("templateFile");
    const file = fileInput.files[0];

    let fileBase64 = "";
    let fileName = "";
    let fileType = "";

    // -------------------------
    // VALIDATION
    // -------------------------
    if (!company) {
        alert("Company is required");
        return;
    }

    if (!hasTemplate) {
        alert("Please select Yes or No for template");
        return;
    }

    // -------------------------
    // FILE HANDLING
    // -------------------------
    if (file) {

        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Only PDF or DOCX files are allowed!");
            return;
        }

        // safety limit (4MB)
        if (file.size > 4 * 1024 * 1024) {
            alert("File too large (max 4MB)");
            return;
        }

        fileBase64 = await fileToBase64(file);
        fileName = file.name;
        fileType = file.type;
    }

    // -------------------------
    // PAYLOAD (MUST MATCH APPS SCRIPT)
    // -------------------------
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

    // -------------------------
    // SEND TO APPS SCRIPT
    // -------------------------
    try {

        const res = await fetch(SCRIPT_URL, {
            method: "POST",
            body: JSON.stringify(payload)
        });

        const result = await res.json();

        console.log("Server response:", result);

        if (result.success) {
            alert("✅ Template saved successfully!");
            clearForm();
        } else {
            alert("❌ Save failed. Check console.");
            console.error(result.error);
        }

    } catch (err) {
        console.error("Network error:", err);
        alert("Network error. Please try again.");
    }
}

/* =========================
   CLEAR FORM
========================= */
function clearForm() {

    document.getElementById("company").value = "";
    document.getElementById("userRole").value = "";
    document.getElementById("reportType").value = "";
    document.getElementById("currentTool").value = "";
    document.getElementById("mainPain").value = "";
    document.getElementById("hasTemplate").value = "";
    document.getElementById("templateFile").value = "";
}
