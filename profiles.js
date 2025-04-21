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
    if (mobileMenuButton && mobileMenu) {
        // Toggle mobile menu display
        mobileMenuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("show");
        });
        
        // Close menu when clicking outside
        document.addEventListener("click", function(e) {
            if (mobileMenu.classList.contains("show") && 
                !mobileMenu.contains(e.target) && 
                e.target !== mobileMenuButton) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            }
        });
        
        // Close menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            });
        });
    }

        // Add this at the top of your script
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }


    // Function to randomly select a format
    function getRandomFormat() {
    const formats = [
        "FORMAT_CLASSIC",
        "FORMAT_MODERN",
        "FORMAT_PROFESSIONAL",
        "FORMAT_CREATIVE"
    ];
    return formats[Math.floor(Math.random() * formats.length)];
    }

    // Function to set a cookie
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    // Function to get a cookie
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

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

    // Get or create unique ID
    let uniqueId = getCookie('uid');
    if (!uniqueId) {
        uniqueId = generateUUID();
        setCookie('uid', uniqueId, 1); // Store for 30 days
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
            uid: uniqueId, // Add the unique ID here
            templateFormat: getRandomFormat(),
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
        if (formDataObj.projectTitle && formDataObj.projectTitle.length > 0) {
            const projectTechFields = document.querySelectorAll('.project-entry input[name="technologies[]"]');
            for (let i = 0; i < formDataObj.projectTitle.length; i++) {
                // Only push if there's actually a title
                if (formDataObj.projectTitle[i]) {
                    finalData.projects.push({
                        projectTitle: formDataObj.projectTitle[i],
                        projectRole: formDataObj.projectRole[i],
                        projectDuration: formDataObj.projectDuration[i],
                        technologiesUsed: projectTechFields[i] ? projectTechFields[i].value : '',
                        contribution: formDataObj.contribution[i],
                    });
                }
            }
        }

        // Process internships with internship-specific technologies
        if (formDataObj.profileType === "student" && formDataObj.internship === "yes" && formDataObj.internship_organization) {
            for (let i = 0; i < formDataObj.internship_organization.length; i++) {
                if (formDataObj.internship_organization[i] || formDataObj.internship_role[i] || 
                    formDataObj.internship_duration[i] || formDataObj.internship_contribution[i]) {
                    finalData.internships.push({
                        organization: formDataObj.internship_organization[i],
                        role: formDataObj.internship_role[i],
                        duration: formDataObj.internship_duration[i],
                        technologiesUsed: internshipFields[i] ? internshipFields[i].value : '',
                        contribution: formDataObj.internship_contribution[i]
                    });
                }
            }
        }

        // Process work experience with experience-specific technologies
        if (formDataObj.company) {
            for (let i = 0; i < formDataObj.company.length; i++) {
                // Only add if at least one field has content
                if (formDataObj.company[i] || formDataObj.jobTitle[i] || 
                    formDataObj.workDuration[i] || formDataObj.responsibilities[i]) {
                    finalData.experience.push({
                        company: formDataObj.company[i],
                        jobTitle: formDataObj.jobTitle[i],
                        workDuration: formDataObj.workDuration[i],
                        technologiesUsed: experienceFields[i] ? experienceFields[i].value : '',
                        responsibilities: formDataObj.responsibilities[i]
                    });
                }
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
        const getDataPromise = fetch('http://192.168.1.9:8501/getData', {
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
        console.error('Usually Displaying PDFs directly from cache');

    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
});

// PDF Preview Modal Function for multiple PDFs
function showPdfPreviewModal(pdfs, userName) {
    // Create modal container with proper z-index and positioning
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-fadeIn';
    modal.style.animation = 'fadeIn 0.2s ease-out';
    
    // Define styles including positioning adjustments
    if (!document.getElementById('pdf-modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'pdf-modal-styles';
        styleSheet.innerHTML = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideIn {
                from { transform: translateY(20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            .pdf-modal {
                display: flex;
                justify-content: center;
                align-items: center;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            .pdf-modal-content {
                background: white;
                border-radius: 8px;
                width: 90%;
                max-width: 900px;
                max-height: calc(100vh - 100px);
                margin: 0 auto;
                overflow: auto;
                animation: slideIn 0.3s ease;
                display: flex;
                flex-direction: column;
            }
            .pdf-iframe-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: calc(100vh - 200px);
                overflow: auto;
            }
            .pdf-iframe-container iframe {
                width: 100%;
                height: 100%;
                border: none;
            }
            .pdf-tab {
                position: relative;
                transition: all 0.2s ease;
            }
            .pdf-tab.active::after {
                content: '';
                position: absolute;
                bottom: -1px;
                left: 0;
                right: 0;
                height: 2px;
                background-color: #3b82f6;
            }
        `;
        document.head.appendChild(styleSheet);
    }
    
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
            <button class="pdf-tab ${isActive ? 'active text-blue-600 font-medium' : 'text-gray-600'} px-6 py-3 hover:text-blue-600 transition" 
                    data-tab="${type}">
                ${typeFormatted}
            </button>
        `;
        
        contentHtml += `
            <div id="tab-content-${type}" class="tab-content ${isActive ? 'block' : 'hidden'} w-full h-full">
                <iframe src="${pdf.url}" class="w-full h-full pdf-iframe-container rounded-lg shadow" frameborder="0"></iframe>
            </div>
        `;
    });
    
   // Replace the entire modal.innerHTML section with this updated version:
   // Improved modal HTML with better spacing and no scrolling required

    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    modal.innerHTML = `
    <div class="bg-white rounded-xl shadow-2xl max-w-5xl w-full flex flex-col animate-slideIn" 
        style="animation: slideIn 0.3s ease-out; max-height: 90vh;">
        <!-- Header with tabs -->
        <div class="flex flex-col border-b">
            <!-- Document title bar -->
            <div class="flex justify-between items-center p-5 bg-gradient-to-r from-white to-blue-50">
                <h3 class="text-xl font-bold text-gray-800">
                    <span class="text-blue-600">Documents</span> for ${userName}
                </h3>
                <button id="closePdfPreview" class="text-gray-400 hover:text-gray-600 transition p-1 rounded-full hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <!-- Tab Navigation -->
            <div class="flex border-t">
                <button class="pdf-tab active flex-1 py-3 border-b-2 border-blue-600 text-blue-600 font-medium" 
                        data-tab="resume">
                    Resume
                </button>
                <button class="pdf-tab flex-1 py-3 border-b-2 border-transparent text-gray-600 hover:text-blue-600" 
                        data-tab="coverLetter">
                    Cover Letter
                </button>
            </div>
        </div>
        
        <!-- Two-column layout for content preview and actions -->
        <div class="flex flex-1 overflow-hidden">
            <!-- Left column - Document preview -->
            <div class="w-3/5 bg-gray-50 p-4 overflow-auto">
                <div id="tab-content-resume" class="tab-content block h-full">
                    <iframe src="${pdfs.resume.url}#toolbar=0&navpanes=0" class="w-full h-full rounded-lg shadow border" frameborder="0" style="min-height: 60vh;"></iframe>
                </div>
                <div id="tab-content-coverLetter" class="tab-content hidden h-full">
                    <iframe src="${pdfs.coverLetter.url}#toolbar=0&navpanes=0" class="w-full h-full rounded-lg shadow border" frameborder="0" style="min-height: 60vh;"></iframe>
                </div>
            </div>
            
            <!-- Right column - Actions panel -->
            <div class="w-2/5 border-l flex flex-col">
                <!-- Modify Documents Section -->
                <div class="p-5 border-b">
                    <h4 class="text-base font-semibold text-gray-700 mb-4">Modify Documents</h4>
                    
                    <!-- Resume Options -->
                    <div id="resume-options" class="document-options space-y-3">
                        <button id="changeResumeFormat" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Change Resume Format</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button id="regenerateResumeContent" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Regenerate Resume Content</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Cover Letter Options -->
                    <div id="coverLetter-options" class="document-options space-y-3 hidden">
                        <button id="changeCoverLetterFormat" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                                <span>Change Cover Letter Format</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                        
                        <button id="regenerateCoverLetterContent" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span>Regenerate Cover Letter Content</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                    
                    <!-- Always visible regenerate both option -->
                    <div class="mt-4 pt-4 border-t border-dashed">
                        <button id="regenerateBoth" class="w-full flex items-center justify-between px-4 py-3 bg-blue-50 border border-blue-100 rounded-lg hover:bg-blue-100 transition">
                            <div class="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                <span class="font-medium text-blue-700">Regenerate Both Documents</span>
                            </div>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- Download Section -->
                <div class="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h4 class="text-base font-semibold text-gray-700 mb-4">Download Documents</h4>
                        <div class="space-y-3">
                            <a href="${pdfs.resume.url}" download="${pdfs.resume.name}" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Download Resume</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                            
                            <a href="${pdfs.coverLetter.url}" download="${pdfs.coverLetter.name}" class="w-full flex items-center justify-between px-4 py-3 bg-white border rounded-lg hover:bg-gray-50 transition">
                                <div class="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Download Cover Letter</span>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                        </div>
                    </div>
                    
                    <!-- Continue Button -->
                    <div class="mt-6">
                        <button id="closeAndContinue" class="w-full flex items-center justify-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
                            <span>Continue</span>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;

    // Add event listeners
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Tab switching
    const tabs = modal.querySelectorAll('.pdf-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab styling
            tabs.forEach(t => {
                t.classList.remove('active', 'border-blue-600', 'text-blue-600', 'font-medium');
                t.classList.add('border-transparent', 'text-gray-600');
            });
            tab.classList.remove('border-transparent', 'text-gray-600');
            tab.classList.add('active', 'border-blue-600', 'text-blue-600', 'font-medium');
            
            // Show appropriate content
            const tabType = tab.getAttribute('data-tab');
            const tabContents = modal.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.add('hidden'));
            modal.querySelector(`#tab-content-${tabType}`).classList.remove('hidden');
            
            // Show appropriate options
            const optionPanels = modal.querySelectorAll('.document-options');
            optionPanels.forEach(panel => panel.classList.add('hidden'));
            modal.querySelector(`#${tabType}-options`).classList.remove('hidden');
        });
    });

    // Close button
    const closeButton = modal.querySelector('#closePdfPreview');
    closeButton.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
    });

    // Continue button
    const continueButton = modal.querySelector('#closeAndContinue');
    continueButton.addEventListener('click', () => {
        modal.remove();
        document.body.style.overflow = '';
        // Add any navigation logic here
    });

    // Function to handle regeneration actions
    function handleRegeneration(type, action) {
        console.log(`Regenerating ${type} with action: ${action}`);
        
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10';
        loadingOverlay.innerHTML = `
            <div class="flex flex-col items-center">
                <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-lg font-medium text-gray-700">Regenerating document...</p>
            </div>
        `;
        
        // Add loading overlay to the appropriate area
        if (type === 'resume' || type === 'all') {
            const resumeContent = modal.querySelector('#tab-content-resume');
            resumeContent.style.position = 'relative';
            resumeContent.appendChild(loadingOverlay.cloneNode(true));
        }
        
        if (type === 'coverLetter' || type === 'all') {
            const coverLetterContent = modal.querySelector('#tab-content-coverLetter');
            coverLetterContent.style.position = 'relative';
            coverLetterContent.appendChild(loadingOverlay.cloneNode(true));
        }
        
        // Here you would add your actual regeneration API call
        // For example:
        // regenerateDocument(type, action).then(() => {
        //     // Update documents and remove loading overlays
        // });
    }

// Add event listeners for all regeneration buttons
const regenerateButtons = [
    { selector: '#changeResumeFormat', type: 'resume', action: 'format' },
    { selector: '#regenerateResumeContent', type: 'resume', action: 'content' },
    { selector: '#changeCoverLetterFormat', type: 'coverLetter', action: 'format' },
    { selector: '#regenerateCoverLetterContent', type: 'coverLetter', action: 'content' },
    { selector: '#regenerateBoth', type: 'all', action: 'both' }
];

regenerateButtons.forEach(config => {
    const button = modal.querySelector(config.selector);
    button.addEventListener('click', () => {
        handleRegeneration(config.type, config.action);
    });
});

// Make the modal responsive
window.addEventListener('resize', () => {
    const modal = document.querySelector('.pdf-modal-content');
    if (modal) {
        if (window.innerWidth < 768) {
            // Switch to stacked layout on mobile
            const contentArea = modal.querySelector('.flex-1.overflow-hidden');
            contentArea.classList.remove('flex');
            contentArea.classList.add('flex-col');
            
            const previewArea = contentArea.querySelector('.w-3/5');
            previewArea.classList.remove('w-3/5');
            previewArea.classList.add('w-full');
            
            const actionsArea = contentArea.querySelector('.w-2/5');
            actionsArea.classList.remove('w-2/5');
            actionsArea.classList.add('w-full');
        } else {
            // Switch back to side-by-side layout
            const contentArea = modal.querySelector('.flex-1.overflow-hidden');
            contentArea.classList.add('flex');
            contentArea.classList.remove('flex-col');
            
            const previewArea = contentArea.querySelector('.w-full:first-child');
            if (previewArea) {
                previewArea.classList.add('w-3/5');
                previewArea.classList.remove('w-full');
            }
            
            const actionsArea = contentArea.querySelector('.w-full:last-child');
            if (actionsArea) {
                actionsArea.classList.add('w-2/5');
                actionsArea.classList.remove('w-full');
            }
        }
    }
});
   

   
   // Function to handle regeneration actions
   function getUidFromCookie() {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'uid') {
        return value;
      }
    }
    console.error('UID not found in cookies');
    return null;
  }
  
  // Function to handle regeneration of documents
  async function regenerateDocument(type, action) {
    const uid = getUidFromCookie();
    if (!uid) {
      alert('User ID not found. Please try again or reload the page.');
      return false;
    }
  
    // Determine the endpoint based on document type
    let endpoint = '';
    if (type === 'resume') {
      endpoint = 'http://192.168.1.5:8502/generate/regenerate_resume';
    } else if (type === 'coverLetter') {
      endpoint = 'http://192.168.1.5:8502/generate/regenerate_cover_letter';
    } else if (type === 'all') {
      // Handle the regeneration of both documents
      const resumeSuccess = await regenerateDocument('resume', action);
      const coverLetterSuccess = await regenerateDocument('coverLetter', action);
      
      // Remove loading overlays
      removeLoadingOverlays();
      
      return resumeSuccess && coverLetterSuccess;
    }
  
    try {
      // Make the API call
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          uid: uid,
          regenerationType: action
        }),
        credentials: 'same-origin'
      });
  
      if (!response.ok) {
        throw new Error(`Failed to regenerate ${type}: ${response.statusText}`);
      }
  
      // Check the content type of the response
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/pdf')) {
        // Handle PDF response
        const pdfBlob = await response.blob();
        const pdfUrl = URL.createObjectURL(pdfBlob);
        
        // Update the iframe source
        const iframe = document.querySelector(`#tab-content-${type} iframe`);
        if (iframe) {
          iframe.src = `${pdfUrl}#toolbar=0&navpanes=0`;
        }
        
        // Update the download link
        const downloadLink = document.querySelector(`a[download="${pdfs[type].name}"]`);
        if (downloadLink) {
          downloadLink.href = pdfUrl;
        }
        
        // Update the stored URL in the pdfs object
        pdfs[type].url = pdfUrl;
        
        console.log(`Successfully regenerated ${type}`);
        
        // Remove loading overlay
        const contentEl = document.querySelector(`#tab-content-${type}`);
        const loadingOverlay = contentEl.querySelector('.absolute.inset-0');
        if (loadingOverlay) {
          loadingOverlay.remove();
        }
        
        return true;
      } else {
        // Handle JSON response
        try {
          const result = await response.json();
          
          // If successful, update the document iframe with the new URL
          if (result.success && result.url) {
            // Update the iframe source
            const iframe = document.querySelector(`#tab-content-${type} iframe`);
            if (iframe) {
              iframe.src = `${result.url}#toolbar=0&navpanes=0`;
            }
            
            // Update the download link
            const downloadLink = document.querySelector(`a[download="${pdfs[type].name}"]`);
            if (downloadLink) {
              downloadLink.href = result.url;
            }
            
            // Update the stored URL in the pdfs object
            pdfs[type].url = result.url;
            
            console.log(`Successfully regenerated ${type}`);
            
            // Remove loading overlay
            const contentEl = document.querySelector(`#tab-content-${type}`);
            const loadingOverlay = contentEl.querySelector('.absolute.inset-0');
            if (loadingOverlay) {
              loadingOverlay.remove();
            }
            
            return true;
          } else {
            console.error(`Failed to regenerate ${type}:`, result.error || 'Unknown error');
            alert(`Failed to regenerate ${type}. Please try again.`);
            return false;
          }
        } catch (jsonError) {
          console.error(`Error parsing JSON response for ${type}:`, jsonError);
          alert(`Error processing response for ${type}. The server may be returning an invalid format.`);
          return false;
        }
      }
    } catch (error) {
      console.error(`Error regenerating ${type}:`, error);
      alert(`Error regenerating ${type}: ${error.message}`);
      
      // Remove loading overlay even on error
      const contentEl = document.querySelector(`#tab-content-${type}`);
      const loadingOverlay = contentEl.querySelector('.absolute.inset-0');
      if (loadingOverlay) {
        loadingOverlay.remove();
      }
      
      return false;
    }
  }
  
  // Helper function to remove all loading overlays
  function removeLoadingOverlays() {
    const overlays = document.querySelectorAll('.absolute.inset-0.bg-white.bg-opacity-80');
    overlays.forEach(overlay => overlay.remove());
  }  
  // Replace the placeholder handleRegeneration function with the actual implementation
  function handleRegeneration(type, action) {
    console.log(`Regenerating ${type} with action: ${action}`);
    
    // Display loading state
    const loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10';
    loadingOverlay.innerHTML = `
        <div class="flex flex-col items-center">
            <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p class="text-lg font-medium text-gray-700">Generating your documents...</p>
            <p class="text-sm text-gray-500 mt-2">This may take a moment</p>
        </div>
    `;
    
    // Add to the appropriate content area
    if (type === 'resume' || type === 'all') {
      const resumeContent = modal.querySelector('#tab-content-resume');
      resumeContent.style.position = 'relative';
      resumeContent.appendChild(loadingOverlay.cloneNode(true));
    }
    
    if (type === 'coverLetter' || type === 'all') {
      const coverLetterContent = modal.querySelector('#tab-content-coverLetter');
      coverLetterContent.style.position = 'relative';
      coverLetterContent.appendChild(loadingOverlay.cloneNode(true));
    }
    
    // Call the actual regeneration function
    regenerateDocument(type, action).then((success) => {
      // If it's not a "both" regeneration (which handles its own cleanup),
      // remove the loading overlays here
      if (type !== 'all') {
        removeLoadingOverlays();
      }
      
      if (success) {
        // Show success notification
        showNotification('Document updated successfully!', 'success');
      }
    }).catch(error => {
      removeLoadingOverlays();
      showNotification('Failed to update document. Please try again.', 'error');
      console.error('Regeneration error:', error);
    });
  }
  
  // Function to show notifications
  function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center ${
      type === 'success' ? 'bg-green-100 border-l-4 border-green-500' : 'bg-red-100 border-l-4 border-red-500'
    }`;
    
    notification.innerHTML = `
      <div class="mr-3">
        <svg class="h-6 w-6 ${type === 'success' ? 'text-green-500' : 'text-red-500'}" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          ${type === 'success' 
            ? '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>'
            : '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>'
          }
        </svg>
      </div>
      <div>
        <p class="font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}">${message}</p>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }
    
    // Set up tab switching with better visual effect
    modal.querySelectorAll('.pdf-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            // Update tab styles
            modal.querySelectorAll('.pdf-tab').forEach(t => {
                t.classList.remove('active', 'text-blue-600', 'font-medium');
                t.classList.add('text-gray-600');
            });
            tab.classList.remove('text-gray-600');
            tab.classList.add('active', 'text-blue-600', 'font-medium');
            
            // Update content visibility with smooth transition
            const tabType = tab.getAttribute('data-tab');
            modal.querySelectorAll('.tab-content').forEach(content => {
                content.style.opacity = '0';
                setTimeout(() => {
                    content.classList.add('hidden');
                    if (content.id === `tab-content-${tabType}`) {
                        content.classList.remove('hidden');
                        setTimeout(() => {
                            content.style.opacity = '1';
                        }, 50);
                    }
                }, 150);
            });
        });
    });
    
    // Event listeners for modal closure with cleaner animation
    const closeModal = () => {
        modal.style.animation = 'fadeIn 0.2s ease-in reverse';
        const modalContent = modal.querySelector('.animate-slideIn');
        modalContent.style.animation = 'slideIn 0.2s ease-in reverse';
        
        setTimeout(() => {
            document.body.removeChild(modal);
            document.body.style.overflow = '';
            // Clean up memory
            Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
        }, 200);
    };
    
    modal.querySelector('#closePdfPreview').addEventListener('click', closeModal);
    modal.querySelector('#closeAndContinue').addEventListener('click', closeModal);
    
    // Improved regenerate functionality with better loading state
    modal.querySelector('#regeneratePdfs').addEventListener('click', async () => {
        const regenerateBtn = modal.querySelector('#regeneratePdfs');
        const originalHtml = regenerateBtn.innerHTML;
        regenerateBtn.disabled = true;
        regenerateBtn.innerHTML = `
            <svg class="animate-spin h-5 w-5 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Regenerating...
        `;
        regenerateBtn.classList.add('opacity-75');
        
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
            const getDataPromise = fetch('http://192.168.1.9:8501/getData', {
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
                    const downloadContainer = modal.querySelector('.border-t.p-4.flex.justify-between .space-x-3');
                    
                    // Add new tab
                    const newTab = document.createElement('button');
                    newTab.className = 'pdf-tab text-gray-600 px-6 py-3 hover:text-blue-600 transition';
                    newTab.setAttribute('data-tab', 'coverLetter');
                    newTab.textContent = 'Cover Letter';
                    tabsContainer.appendChild(newTab);
                    
                    // Add new content
                    const newContent = document.createElement('div');
                    newContent.id = 'tab-content-coverLetter';
                    newContent.className = 'tab-content hidden w-full h-full';
                    newContent.style.opacity = '0';
                    newContent.innerHTML = `<iframe src="${pdf.url}" class="w-full h-full pdf-iframe-container rounded-lg shadow" frameborder="0"></iframe>`;
                    contentContainer.appendChild(newContent);
                    
                    // Add download link
                    const downloadLink = document.createElement('a');
                    downloadLink.href = pdf.url;
                    downloadLink.setAttribute('download', pdf.name);
                    downloadLink.className = 'flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium mt-2 sm:mt-0';
                    downloadLink.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        Cover Letter
                    `;
                    downloadContainer.insertBefore(downloadLink, downloadContainer.lastElementChild);
                    
                    // Add tab switching functionality
                    newTab.addEventListener('click', () => {
                        modal.querySelectorAll('.pdf-tab').forEach(t => {
                            t.classList.remove('active', 'text-blue-600', 'font-medium');
                            t.classList.add('text-gray-600');
                        });
                        newTab.classList.remove('text-gray-600');
                        newTab.classList.add('active', 'text-blue-600', 'font-medium');
                        
                        modal.querySelectorAll('.tab-content').forEach(content => {
                            content.style.opacity = '0';
                            setTimeout(() => {
                                content.classList.add('hidden');
                                if (content.id === 'tab-content-coverLetter') {
                                    content.classList.remove('hidden');
                                    setTimeout(() => {
                                        content.style.opacity = '1';
                                    }, 50);
                                }
                            }, 150);
                        });
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
            
            // Show success notification instead of alert
            const notification = document.createElement('div');
            notification.className = 'fixed top-20 right-4 bg-green-50 text-green-800 px-4 py-3 rounded-lg shadow-lg flex items-center z-[1001]';
            notification.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Documents successfully regenerated!
            `;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }, 3000);
            
        } catch (error) {
            console.error('Regeneration error:', error);
            
            // Show error notification instead of alert
            const notification = document.createElement('div');
            notification.className = 'fixed top-20 right-4 bg-red-50 text-red-800 px-4 py-3 rounded-lg shadow-lg flex items-center z-[1001]';
            notification.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Failed to regenerate documents. Please try again.
            `;
            document.body.appendChild(notification);
            
            // Remove notification after 4 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                notification.style.transition = 'opacity 0.5s ease';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }, 4000);
        } finally {
            regenerateBtn.disabled = false;
            regenerateBtn.innerHTML = originalHtml;
            regenerateBtn.classList.remove('opacity-75');
        }
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Add keyboard support (Escape to close)
    const handleEscape = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', handleEscape);
        }
    };
    document.addEventListener('keydown', handleEscape);
    
    // Adjust position for navbar
    function adjustModalPosition() {
        const navbarHeight = document.querySelector('nav')?.offsetHeight || 0;
        const modalContent = modal.querySelector('.pdf-modal-content');
        if (modalContent) {
            modalContent.style.maxHeight = `calc(100vh - ${navbarHeight + 40}px)`;
            modalContent.style.marginTop = `${navbarHeight + 20}px`;
            modalContent.style.marginBottom = `${navbarHeight + 20}px`;
        }
    }
    
    // Call immediately and on resize
    adjustModalPosition();
    window.addEventListener('resize', adjustModalPosition);
    
    // Remember to remove resize listener on close
    const originalCloseModal = closeModal;
    closeModal = () => {
        window.removeEventListener('resize', adjustModalPosition);
        originalCloseModal();
    };
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