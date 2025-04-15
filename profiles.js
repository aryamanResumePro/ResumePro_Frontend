document.addEventListener("DOMContentLoaded", () => {
    // Get all DOM elements
    const resumeForm = document.getElementById("resumeForm");
    const studentSection = document.getElementById("studentSection");
    const professionalSection = document.getElementById("professionalSection");
    const internshipSection = document.getElementById("internshipSection");
    const addInternshipBtn = document.getElementById("addInternshipBtn");
    const addEducationBtn = document.getElementById("addEducationBtn");
    const addProjectBtn = document.getElementById("addProjectBtn");
    const addExperienceBtn = document.getElementById("addExperienceBtn");
    const addAchievementBtn = document.getElementById("addAchievementBtn");
    const addCertificationBtn = document.getElementById("addCertificationBtn");
    const addPublicationBtn = document.getElementById("addPublicationBtn");
    const educationFields = document.getElementById("educationFields");
    const projectFields = document.getElementById("projectFields");
    const experienceFields = document.getElementById("experienceFields");
    const achievementsFields = document.getElementById("achievementsFields");
    const certificationsFields = document.getElementById("certificationsFields");
    const publicationsFields = document.getElementById("publicationsFields");
    const internshipStatus = document.getElementById("internshipStatus");
    const initialProfileType = document.querySelector('input[name="profileType"]:checked').value;
    const mobileMenuButton = document.getElementById("mobileMenuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const generateCoverLetterCheckbox = document.getElementById('generateCoverLetter');
    const agreeTermsCheckbox = document.getElementById('agreeTerms');
    const internshipFields = document.getElementById("internshipFields");

    // Mobile menu toggle
    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        mobileMenu.classList.toggle("hidden");
    });

    // Initialize visibility based on profile type
    function toggleRequiredAttributes(section, isRequired) {
        const fields = section.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
            if (isRequired) {
                field.setAttribute("required", true);
            } else {
                field.removeAttribute("required");
            }
        });
    }

    toggleRequiredAttributes(studentSection, initialProfileType === "student");
    toggleRequiredAttributes(professionalSection, initialProfileType === "professional");
    professionalSection.classList.toggle("hidden", initialProfileType !== "professional");

    // Cover Letter Popup
    generateCoverLetterCheckbox.addEventListener('change', function() {
        if (this.checked) {
            const popup = document.createElement('div');
            popup.className = 'fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-lg text-sm';
            popup.textContent = 'Cover letter will be generated with your resume.';
            document.body.appendChild(popup);
            
            setTimeout(() => {
                popup.remove();
            }, 3000);
        }
    });

    // Toggle between student and professional profiles
    document.querySelectorAll('.profileType').forEach(radio => {
        radio.addEventListener("change", function() {
            const isStudent = this.value === "student";
            studentSection.classList.toggle("hidden", !isStudent);
            professionalSection.classList.toggle("hidden", isStudent);
            internshipStatus.classList.toggle("hidden", !isStudent);
            internshipSection.classList.add("hidden");
            toggleRequiredAttributes(studentSection, isStudent);
            toggleRequiredAttributes(professionalSection, !isStudent);
        });
    });

    // Toggle Internship Section Visibility
    document.querySelectorAll('.internshipToggle').forEach(radio => {
        radio.addEventListener("change", function() {
            const showInternship = this.value === "yes";
            internshipSection.classList.toggle("hidden", !showInternship);
            addInternshipBtn.classList.toggle("hidden", !showInternship);
            toggleRequiredAttributes(internshipSection, showInternship);
        });
    });

    // Add Education Entry
    addEducationBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("education-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">University/College</label>
                    <input type="text" name="institution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter institution name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Degree</label>
                    <input type="text" name="degree[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Degree obtained" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Year of Graduation</label>
                    <input type="text" name="graduationYear[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Graduation year" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Percentage/Grade/GPA</label>
                    <input type="text" name="grade[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., 85%, 3.8 GPA">
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        educationFields.appendChild(newEntry);
    });

    // Add Project Entry
    addProjectBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("project-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Project Title</label>
                    <input type="text" name="projectTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter project title" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Role</label>
                    <input type="text" name="projectRole[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Your role" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="projectDuration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023 - Present" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Technologies Used</label>
                    <input type="text" name="technologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS" required>
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Contribution</label>
                    <textarea name="contribution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your contribution" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        projectFields.appendChild(newEntry);
    });

    // Add Work Experience Entry
    addExperienceBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("experience-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Company</label>
                    <input type="text" name="company[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Company name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Job Title</label>
                    <input type="text" name="jobTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Job title" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="workDuration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2020 - Present" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Technologies Used</label>
                    <input type="text" name="technologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS" required>
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Responsibilities</label>
                    <textarea name="responsibilities[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your responsibilities" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        experienceFields.appendChild(newEntry);
    });

    // Add Internship Entry
    function addInternshipEntry() {
        const newEntry = document.createElement("div");
        newEntry.classList.add("internship-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Organization</label>
                    <input type="text" name="internship_organization[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter organization name" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Role</label>
                    <input type="text" name="internship_role[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter your role" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Duration</label>
                    <input type="text" name="internship_duration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., 3 months" required>
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Technologies Used</label>
                    <input type="text" name="technologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS">
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Contribution</label>
                    <textarea name="internship_contribution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your contribution" rows="4" required></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        internshipFields.appendChild(newEntry);
    }

    // Add Internship Button
    addInternshipBtn.addEventListener("click", () => {
        addInternshipEntry();
    });

    // Add Achievement Entry
    addAchievementBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("achievement-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Title</label>
                    <input type="text" name="achievementTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter achievement title">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Date</label>
                    <input type="text" name="achievementDate[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023">
                </div>
                <div class="md:col-span-2 space-y-2">
                    <label class="block font-medium text-gray-700">Description</label>
                    <textarea name="achievementDescription[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe the achievement" rows="4"></textarea>
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        achievementsFields.appendChild(newEntry);
    });

    // Add Certification Entry
    addCertificationBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("certification-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Title</label>
                    <input type="text" name="certificationTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter certification title">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Issuer</label>
                    <input type="text" name="certificationIssuer[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Issuer (e.g., Coursera)">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Date</label>
                    <input type="text" name="certificationDate[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Certificate Number</label>
                    <input type="text" name="certificationNumber[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter certificate number">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Validity</label>
                    <input type="text" name="certificationValidity[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Lifetime, 2 years">
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        certificationsFields.appendChild(newEntry);
    });

    // Add Publication Entry
    addPublicationBtn.addEventListener("click", () => {
        const newEntry = document.createElement("div");
        newEntry.classList.add("publication-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
        newEntry.innerHTML = `
            <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Title</label>
                    <input type="text" name="publicationTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter publication title">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Authors</label>
                    <input type="text" name="publicationAuthors[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter authors">
                </div>
                <div class="space-y-2">
                    <label class="block font-medium text-gray-700">Link</label>
                    <input type="url" name="publicationLink[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter publication link">
                </div>
            </div>
            <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
        `;
        publicationsFields.appendChild(newEntry);
    });

    // Remove Entry
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-entry")) {
            const entry = e.target.closest(".education-entry, .project-entry, .experience-entry, .internship-entry, .achievement-entry, .certification-entry, .publication-entry");
            const parent = entry.parentElement;

            if (entry.classList.contains("achievement-entry") || entry.classList.contains("certification-entry") || entry.classList.contains("publication-entry")) {
                entry.remove();
            } else if (parent.children.length > 1) {
                entry.remove();
            } else {
                alert("Default fields cannot be removed.");
            }
        }
    });

// Form Submission
resumeForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!agreeTermsCheckbox.checked) {
        alert('You must agree to the Terms of Use and Privacy Policy to continue.');
        return;
    }

    // Show loading state
    const submitButton = resumeForm.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</span>';

    try {
        // Collect form data
        const formData = new FormData(resumeForm);
        const formDataObj = {};

        // Convert FormData to object with proper array handling
        for (let [key, value] of formData.entries()) {
            if (key.endsWith('[]')) {
                const cleanKey = key.slice(0, -2);
                if (!formDataObj[cleanKey]) {
                    formDataObj[cleanKey] = [];
                }
                formDataObj[cleanKey].push(value);
            } else {
                formDataObj[key] = value;
            }
        }

        // Prepare final data object with separate technologies arrays
        const finalData = {
            name: formDataObj.name,
            email: formDataObj.email,
            phone: formDataObj.phone,
            linkedin: formDataObj.linkedin,
            github: formDataObj.github,
            website: formDataObj.website,
            profileType: formDataObj.profileType,
            desiredRole: formDataObj.desiredRole,
            desiredCompany: formDataObj.desiredCompany,
            generateCoverLetter: formDataObj.generateCoverLetter === "on",
            agreedToTerms: true,
            education: [],
            projects: [],
            internships: [],
            experience: [],
            achievements: [],
            certifications: [],
            publications: [],
        };

        // Process education data
        if (formDataObj.institution) {
            for (let i = 0; i < formDataObj.institution.length; i++) {
                finalData.education.push({
                    institution: formDataObj.institution[i],
                    degree: formDataObj.degree[i],
                    graduationYear: formDataObj.graduationYear[i],
                    grade: formDataObj.grade[i],
                });
            }
        }

        // Process projects with project-specific technologies
        if (formDataObj.projectTitle) {
            const projectTechFields = document.querySelectorAll('.project-entry input[name="technologies[]"]');
            for (let i = 0; i < formDataObj.projectTitle.length; i++) {
                finalData.projects.push({
                    projectTitle: formDataObj.projectTitle[i],
                    projectRole: formDataObj.projectRole[i],
                    projectDuration: formDataObj.projectDuration[i],
                    technologiesUsed: projectTechFields[i] ? projectTechFields[i].value : '',
                    contribution: formDataObj.contribution[i],
                });
            }
        }

        // Process internships with internship-specific technologies
        if (formDataObj.profileType === "student" && formDataObj.internship === "yes" && formDataObj.internship_organization) {
            const internshipTechFields = document.querySelectorAll('.internship-entry input[name="technologies[]"]');
            for (let i = 0; i < formDataObj.internship_organization.length; i++) {
                finalData.internships.push({
                    organization: formDataObj.internship_organization[i],
                    role: formDataObj.internship_role[i],
                    duration: formDataObj.internship_duration[i],
                    technologiesUsed: internshipTechFields[i] ? internshipTechFields[i].value : '',
                    contribution: formDataObj.internship_contribution[i],
                });
            }
        }

        // Process work experience with experience-specific technologies
        if (formDataObj.company) {
            const experienceTechFields = document.querySelectorAll('.experience-entry input[name="technologies[]"]');
            for (let i = 0; i < formDataObj.company.length; i++) {
                finalData.experience.push({
                    company: formDataObj.company[i],
                    jobTitle: formDataObj.jobTitle[i],
                    workDuration: formDataObj.workDuration[i],
                    technologiesUsed: experienceTechFields[i] ? experienceTechFields[i].value : '',
                    responsibilities: formDataObj.responsibilities[i],
                });
            }
        }

        // Process achievements
        if (formDataObj.achievementTitle) {
            for (let i = 0; i < formDataObj.achievementTitle.length; i++) {
                finalData.achievements.push({
                    title: formDataObj.achievementTitle[i],
                    date: formDataObj.achievementDate[i],
                    description: formDataObj.achievementDescription[i],
                });
            }
        }

        // Process certifications
        if (formDataObj.certificationTitle) {
            for (let i = 0; i < formDataObj.certificationTitle.length; i++) {
                finalData.certifications.push({
                    title: formDataObj.certificationTitle[i],
                    issuer: formDataObj.certificationIssuer[i],
                    date: formDataObj.certificationDate[i],
                    certificateNumber: formDataObj.certificationNumber[i],
                    validity: formDataObj.certificationValidity[i],
                });
            }
        }

        // Process publications
        if (formDataObj.publicationTitle) {
            for (let i = 0; i < formDataObj.publicationTitle.length; i++) {
                finalData.publications.push({
                    title: formDataObj.publicationTitle[i],
                    authors: formDataObj.publicationAuthors[i],
                    link: formDataObj.publicationLink[i],
                });
            }
        }

        // Collection of PDFs to display
        const pdfs = {};

        // 1. ALWAYS send to getData endpoint
        const getDataPromise = fetch('http://192.168.1.8:8501/getData', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        // 2. Set up resume generation
        const resumePromise = fetch('http://192.168.1.5:8502/generate/generate_resume', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(finalData)
        });

        // 3. Set up cover letter generation if requested
        let coverLetterPromise = null;
        if (finalData.generateCoverLetter) {
            coverLetterPromise = fetch('http://192.168.1.5:8502/generate/generate_cover_letter', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(finalData)
            });
        }

        // Wait for getData to complete
        const getDataResponse = await getDataPromise;
        if (!getDataResponse.ok) {
            throw new Error(`Failed to send data to getData endpoint: ${getDataResponse.status}`);
        }

        // Wait for all PDF generation requests to complete simultaneously
        const responses = await Promise.all([
            resumePromise,
            ...(coverLetterPromise ? [coverLetterPromise] : [])
        ]);

        // Check if any request failed
        const failedResponse = responses.find(response => !response.ok);
        if (failedResponse) {
            throw new Error(`PDF generation failed with status: ${failedResponse.status}`);
        }

        // Process resume response
        const resumePdfBlob = await responses[0].blob();
        const resumePdfUrl = URL.createObjectURL(resumePdfBlob);
        pdfs.resume = {
            url: resumePdfUrl,
            name: `${finalData.name || 'User'}-resume.pdf`
        };

        // Process cover letter response if it exists
        if (coverLetterPromise) {
            const coverLetterPdfBlob = await responses[1].blob();
            const coverLetterPdfUrl = URL.createObjectURL(coverLetterPdfBlob);
            pdfs.coverLetter = {
                url: coverLetterPdfUrl,
                name: `${finalData.name || 'User'}-cover-letter.pdf`
            };
        }

        // Show PDFs in preview modal
        showPdfPreviewModal(pdfs, finalData.name || 'User');
        
        // Save JSON data for reference
        downloadObjectAsJson(finalData, "resume-data");

    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// PDF Preview Modal Function for multiple PDFs
function showPdfPreviewModal(pdfs, userName) {
    // Create modal container
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    // Create tabs for each PDF
    let tabsHtml = '';
    let contentHtml = '';
    let activeSet = false;
    
    // Generate tabs and content for each PDF
    Object.entries(pdfs).forEach(([type, pdf], index) => {
        const isActive = !activeSet;
        if (isActive) activeSet = true;
        
        const typeFormatted = type === 'resume' ? 'Resume' : 'Cover Letter';
        
        tabsHtml += `
            <button class="pdf-tab ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'} px-4 py-2 rounded-t-lg hover:bg-blue-500 hover:text-white transition" 
                    data-tab="${type}">
                ${typeFormatted}
            </button>
        `;
        
        contentHtml += `
            <div id="tab-content-${type}" class="tab-content ${isActive ? 'block' : 'hidden'} w-full h-full">
                <iframe src="${pdf.url}" class="w-full h-full min-h-[70vh]" frameborder="0"></iframe>
            </div>
        `;
    });
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-hidden flex flex-col">
            <div class="flex justify-between items-center border-b p-4">
                <h3 class="text-xl font-bold">Generated Documents for ${userName}</h3>
                <button id="closePdfPreview" class="text-gray-500 hover:text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <div class="border-b flex space-x-1 px-4 pt-2">
                ${tabsHtml}
            </div>
            
            <div class="flex-grow overflow-auto">
                ${contentHtml}
            </div>
            
            <div class="border-t p-4 flex justify-between">
                <button id="regeneratePdfs" class="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition">
                    Regenerate Documents
                </button>
                <div class="space-x-2">
                    ${Object.entries(pdfs).map(([type, pdf]) => `
                        <a href="${pdf.url}" download="${pdf.name}" class="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition">
                            Download ${type === 'resume' ? 'Resume' : 'Cover Letter'}
                        </a>
                    `).join('')}
                    <button id="closeAndContinue" class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
                        Close
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Set up tab switching
    modal.querySelectorAll('.pdf-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styles
            modal.querySelectorAll('.pdf-tab').forEach(t => {
                t.classList.remove('bg-blue-600', 'text-white');
                t.classList.add('bg-gray-100', 'text-gray-700');
            });
            tab.classList.remove('bg-gray-100', 'text-gray-700');
            tab.classList.add('bg-blue-600', 'text-white');
            
            // Update content visibility
            const tabType = tab.getAttribute('data-tab');
            modal.querySelectorAll('.tab-content').forEach(content => {
                content.classList.add('hidden');
            });
            modal.querySelector(`#tab-content-${tabType}`).classList.remove('hidden');
        });
    });
    
    // Event listeners for modal
    modal.querySelector('#closePdfPreview').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
        // Clean up memory
        Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
    });
    
    modal.querySelector('#closeAndContinue').addEventListener('click', () => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
        // Clean up memory
        Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
    });
    
    modal.querySelector('#regeneratePdfs').addEventListener('click', async () => {
        const regenerateBtn = modal.querySelector('#regeneratePdfs');
        const originalText = regenerateBtn.textContent;
        regenerateBtn.disabled = true;
        regenerateBtn.innerHTML = '<span class="inline-flex items-center"><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Regenerating...</span>';
        
        try {
            // Get fresh form data
            const formData = new FormData(resumeForm);
            const formDataObj = {};
            
            for (let [key, value] of formData.entries()) {
                if (key.endsWith('[]')) {
                    const cleanKey = key.slice(0, -2);
                    if (!formDataObj[cleanKey]) {
                        formDataObj[cleanKey] = [];
                    }
                    formDataObj[cleanKey].push(value);
                } else {
                    formDataObj[key] = value;
                }
            }
            
            // Prepare data for regeneration
            const regenerationData = {
                ...formDataObj,
                generateCoverLetter: formDataObj.generateCoverLetter === "on",
                agreedToTerms: true
            };
            
            // Collection of new PDFs
            const newPdfs = {};
            
            // Send to getData endpoint again
            const getDataPromise = fetch('http://192.168.1.8:8501/getData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regenerationData)
            });
            
            // Set up resume regeneration
            const resumePromise = fetch('http://192.168.1.5:8502/generate/generate_resume', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regenerationData)
            });
            
            // Set up cover letter regeneration if requested
            let coverLetterPromise = null;
            if (regenerationData.generateCoverLetter) {
                coverLetterPromise = fetch('http://192.168.1.5:8502/generate/generate_cover_letter', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(regenerationData)
                });
            }
            
            // Wait for getData to complete
            const getDataResponse = await getDataPromise;
            if (!getDataResponse.ok) {
                throw new Error(`Failed to send data to getData endpoint: ${getDataResponse.status}`);
            }
            
            // Wait for all PDF generation requests to complete simultaneously
            const responses = await Promise.all([
                resumePromise,
                ...(coverLetterPromise ? [coverLetterPromise] : [])
            ]);
            
            // Check if any request failed
            const failedResponse = responses.find(response => !response.ok);
            if (failedResponse) {
                throw new Error(`PDF regeneration failed with status: ${failedResponse.status}`);
            }
            
            // Process resume response
            const newResumePdfBlob = await responses[0].blob();
            const newResumePdfUrl = URL.createObjectURL(newResumePdfBlob);
            newPdfs.resume = {
                url: newResumePdfUrl,
                name: `${formDataObj.name || 'User'}-resume-regenerated.pdf`
            };
            
            // Process cover letter response if it exists
            if (coverLetterPromise) {
                const newCoverLetterPdfBlob = await responses[1].blob();
                const newCoverLetterPdfUrl = URL.createObjectURL(newCoverLetterPdfBlob);
                newPdfs.coverLetter = {
                    url: newCoverLetterPdfUrl,
                    name: `${formDataObj.name || 'User'}-cover-letter-regenerated.pdf`
                };
            }
            
            // Update PDFs in the modal
            Object.entries(newPdfs).forEach(([type, pdf]) => {
                const iframe = modal.querySelector(`#tab-content-${type} iframe`);
                if (iframe) {
                    iframe.src = pdf.url;
                    
                    // Update download link
                    modal.querySelectorAll(`a[download*="${type === 'resume' ? 'resume' : 'cover-letter'}"]`).forEach(link => {
                        link.href = pdf.url;
                        link.setAttribute('download', pdf.name);
                    });
                } else if (type === 'coverLetter') {
                    // If cover letter wasn't there before but is now, need to add a new tab and content
                    const tabsContainer = modal.querySelector('.border-b.flex');
                    const contentContainer = modal.querySelector('.flex-grow.overflow-auto');
                    const downloadContainer = modal.querySelector('.border-t.p-4.flex.justify-between .space-x-2');
                    
                    // Add new tab
                    const newTab = document.createElement('button');
                    newTab.className = 'pdf-tab bg-gray-100 text-gray-700 px-4 py-2 rounded-t-lg hover:bg-blue-500 hover:text-white transition';
                    newTab.setAttribute('data-tab', 'coverLetter');
                    newTab.textContent = 'Cover Letter';
                    tabsContainer.appendChild(newTab);
                    
                    // Add new content
                    const newContent = document.createElement('div');
                    newContent.id = 'tab-content-coverLetter';
                    newContent.className = 'tab-content hidden w-full h-full';
                    newContent.innerHTML = `<iframe src="${pdf.url}" class="w-full h-full min-h-[70vh]" frameborder="0"></iframe>`;
                    contentContainer.appendChild(newContent);
                    
                    // Add download link
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pdf.url;
                    downloadLink.setAttribute('download', pdf.name);
                    downloadLink.className = 'px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition';
                    downloadLink.textContent = 'Download Cover Letter';
                    downloadContainer.insertBefore(downloadLink, downloadContainer.lastElementChild);
                    
                    // Add tab switching functionality
                    newTab.addEventListener('click', () => {
                        modal.querySelectorAll('.pdf-tab').forEach(t => {
                            t.classList.remove('bg-blue-600', 'text-white');
                            t.classList.add('bg-gray-100', 'text-gray-700');
                        });
                        newTab.classList.remove('bg-gray-100', 'text-gray-700');
                        newTab.classList.add('bg-blue-600', 'text-white');
                        
                        modal.querySelectorAll('.tab-content').forEach(content => {
                            content.classList.add('hidden');
                        });
                        newContent.classList.remove('hidden');
                    });
                }
            });
            
            // Clean up old URLs
            Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
            
            // Update the pdfs object with new URLs
            Object.keys(pdfs).forEach(key => {
                if (newPdfs[key]) {
                    pdfs[key] = newPdfs[key];
                }
            });
            
            // Add any new pdfs that weren't there before
            Object.keys(newPdfs).forEach(key => {
                if (!pdfs[key]) {
                    pdfs[key] = newPdfs[key];
                }
            });
            
            alert('Documents successfully regenerated!');
            
        } catch (error) {
            console.error('Regeneration error:', error);
            alert('Failed to regenerate documents. Please try again.');
        } finally {
            regenerateBtn.disabled = false;
            regenerateBtn.textContent = originalText;
        }
    });
}

    // Helper function to download data as JSON
    function downloadObjectAsJson(exportObj, exportName) {
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    }
});