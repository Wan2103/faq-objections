document.addEventListener("DOMContentLoaded", () => {
    init();
});

function init() {
    document.getElementById("hasTemplate").addEventListener("change", toggleMode);
    document.getElementById("templateList").addEventListener("change", previewTemplate);
    document.getElementById("generateBtn").addEventListener("click", generateTemplate);

    document.getElementById("saveBtn").addEventListener("click", saveTemplate);
    document.getElementById("pdfBtn").addEventListener("click", downloadPDF);
    document.getElementById("docxBtn").addEventListener("click", downloadDOCX);

    document.getElementById("useTemplateBtn").addEventListener("click", useTemplate);

    toggleMode();
}

/* ---------------------------
   MODE SWITCH
----------------------------*/
function toggleMode() {
    const mode = document.getElementById("hasTemplate").value;

    const upload = document.getElementById("uploadSection");
    const generate = document.getElementById("generateSection");
    const library = document.getElementById("libraryCard");
    const fileInput = document.getElementById("templateFile");

    if (mode === "yes") {
        upload.classList.remove("hidden");
        generate.classList.add("hidden");
        library.classList.add("hidden");

        fileInput.disabled = false;
    } else {
        upload.classList.add("hidden");
        generate.classList.remove("hidden");
        library.classList.remove("hidden");

        fileInput.disabled = true;

        loadTemplates();
    }
}

/* ---------------------------
   TEMPLATE LIBRARY
----------------------------*/
function loadTemplates() {
    const list = document.getElementById("templateList");

    const templates = [
        {
            name: "Full Inspection Report",
            content: "Header → Client → Inspection → Photos → Findings → Recommendations → Sign-off"
        },
        {
            name: "Quick Field Report",
            content: "Header → Inspection → Findings"
        },
        {
            name: "Photo Evidence Report",
            content: "Header → Photos → Findings"
        }
    ];

    list.innerHTML = "";

    templates.forEach((t, index) => {
        const opt = document.createElement("option");
        opt.value = index;
        opt.textContent = t.name;
        list.appendChild(opt);
    });

    previewTemplate();
}

/* ---------------------------
   PREVIEW
----------------------------*/
function previewTemplate() {
    const list = document.getElementById("templateList");
    const preview = document.getElementById("templatePreview");

    const templates = [
        "Full Inspection Report: Header → Client → Inspection → Photos → Findings → Recommendations → Sign-off",
        "Quick Field Report: Header → Inspection → Findings",
        "Photo Evidence Report: Header → Photos → Findings"
    ];

    const selected = list.value;

    preview.innerText = selected !== "" ? templates[selected] : "Select a template to preview...";
}

/* ---------------------------
   GENERATE
----------------------------*/
function generateTemplate() {
    const name = document.getElementById("templateName").value;

    const structure = Array.from(document.querySelectorAll(".structure:checked"))
        .map(el => el.value);

    alert(`Generated:\n${name}\nSections:\n${structure.join(", ")}`);
}

/* ---------------------------
   USE TEMPLATE
----------------------------*/
function useTemplate() {
    alert("Template selected successfully!");
}

/* ---------------------------
   UPLOAD VALIDATION
----------------------------*/
document.addEventListener("change", function (e) {
    if (e.target.id === "templateFile") {
        const file = e.target.files[0];
        if (!file) return;

        const allowed = ["application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowed.includes(file.type)) {
            alert("Only PDF or DOCX files are allowed!");
            e.target.value = "";
        }
    }
});

/* ---------------------------
   ACTIONS
----------------------------*/
function saveTemplate() {
    alert("Template saved!");
}

function downloadPDF() {
    alert("Downloading PDF...");
}

function downloadDOCX() {
    alert("Downloading DOCX...");
}
