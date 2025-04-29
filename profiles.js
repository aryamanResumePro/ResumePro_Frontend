document.addEventListener("DOMContentLoaded", () => {
    // Safely get all DOM elements with null checks
    const getElement = (id) => document.getElementById(id) || null;

    const resumeForm = getElement("resumeForm");
    const studentSection = getElement("studentSection");
    const professionalSection = getElement("professionalSection");
    const internshipSection = getElement("internshipSection");
    const addInternshipBtn = getElement("addInternshipBtn");
    const addEducationBtn = getElement("addEducationBtn");
    const addProjectBtn = getElement("addProjectBtn");
    const addExperienceBtn = getElement("addExperienceBtn");
    const addAchievementBtn = getElement("addAchievementBtn");
    const addCertificationBtn = getElement("addCertificationBtn");
    const addPublicationBtn = getElement("addPublicationBtn");
    const educationFields = getElement("educationFields");
    const projectFields = getElement("projectFields");
    const experienceFields = getElement("experienceFields");
    const achievementsFields = getElement("achievementsFields");
    const certificationsFields = getElement("certificationsFields");
    const publicationsFields = getElement("publicationsFields");
    const internshipStatus = getElement("internshipStatus");
    const mobileMenuButton = getElement("mobileMenuButton");
    const mobileMenu = getElement("mobileMenu");
    const generateCoverLetterCheckbox = getElement('generateCoverLetter');
    const agreeTermsCheckbox = getElement('agreeTerms');
    const internshipFields = getElement("internshipFields");
    const professionalProjectsSection = getElement("professionalProjectsSection");
    const professionalProjectFields = getElement("professionalProjectFields");
    const addProfessionalProjectBtn = getElement("addProfessionalProjectBtn");
    const getAdditionalSkills = getElement("additionalSkills");

    // Get initial profile type safely
    const initialProfileType = document.querySelector('input[name="profileType"]:checked')?.value || "student";

    // Mobile menu toggle - only if elements exist
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener("click", function(e) {
            e.stopPropagation();
            mobileMenu.classList.toggle("hidden");
            mobileMenu.classList.toggle("show");
        });
        
        document.addEventListener("click", function(e) {
            if (mobileMenu.classList.contains("show") && 
                !mobileMenu.contains(e.target) && 
                e.target !== mobileMenuButton) {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            }
        });
        
        const mobileLinks = mobileMenu.querySelectorAll("a");
        mobileLinks.forEach(link => {
            link.addEventListener("click", function() {
                mobileMenu.classList.add("hidden");
                mobileMenu.classList.remove("show");
            });
        });
    }

    // Helper functions
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    function getRandomFormat() {
        const formats = [
            "FORMAT_CLASSIC",
            "FORMAT_MODERN",
            "FORMAT_PROFESSIONAL",
            "FORMAT_CREATIVE"
        ];
        return formats[Math.floor(Math.random() * formats.length)];
    }

    function setCookie(name, value, minutes) {
        let expires = "";
        if (minutes) {
            const date = new Date();
            date.setTime(date.getTime() + (minutes * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

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

    function toggleRequiredAttributes(section, isRequired) {
        if (!section) return;
        const fields = section.querySelectorAll("input, textarea, select");
        fields.forEach(field => {
            if (isRequired) {
                field.setAttribute("required", true);
            } else {
                field.removeAttribute("required");
            }
        });
    }

    // Initialize visibility based on profile type
    toggleRequiredAttributes(studentSection, initialProfileType === "student");
    toggleRequiredAttributes(professionalSection, initialProfileType === "professional");
    
    if (professionalSection) {
        professionalSection.classList.toggle("hidden", initialProfileType !== "professional");
    }
    
    if (professionalProjectsSection) {
        professionalProjectsSection.classList.toggle("hidden", initialProfileType !== "professional");
    }

    // Cover Letter Popup - only if checkbox exists
    if (generateCoverLetterCheckbox) {
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
    }

    // Toggle between student and professional profiles
    document.querySelectorAll('.profileType').forEach(radio => {
        radio.addEventListener("change", function() {
            const isStudent = this.value === "student";
            
            if (studentSection) {
                studentSection.classList.toggle("hidden", !isStudent);
                toggleRequiredAttributes(studentSection, isStudent);
            }
            
            if (professionalSection) {
                professionalSection.classList.toggle("hidden", isStudent);
                toggleRequiredAttributes(professionalSection, !isStudent);
            }
            
            if (professionalProjectsSection) {
                professionalProjectsSection.classList.toggle("hidden", isStudent);
            }
            
            if (internshipStatus) {
                internshipStatus.classList.toggle("hidden", !isStudent);
            }
            
            if (internshipSection) {
                internshipSection.classList.add("hidden");
            }
        });
    });

    // Toggle Internship Section Visibility
    document.querySelectorAll('.internshipToggle').forEach(radio => {
        radio.addEventListener("change", function() {
            const showInternship = this.value === "yes";
            
            if (internshipSection) {
                internshipSection.classList.toggle("hidden", !showInternship);
                toggleRequiredAttributes(internshipSection, showInternship);
            }
            
            if (addInternshipBtn) {
                addInternshipBtn.classList.toggle("hidden", !showInternship);
            }
        });
    });

    // Add Education Entry
    if (addEducationBtn && educationFields) {
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
    }

    // Add Project Entry
    if (addProjectBtn && projectFields) {
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
                        <input type="text" name="projectTechnologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS" required>
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
    }

    // Add Work Experience Entry
    if (addExperienceBtn && experienceFields) {
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
                        <input type="text" name="experienceTechnologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS" required>
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
    }

    // Add Internship Entry
    function addInternshipEntry() {
        if (!internshipFields) return;
        
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
                    <input type="text" name="internship_technologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS">
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
    if (addInternshipBtn) {
        addInternshipBtn.addEventListener("click", addInternshipEntry);
    }

    // Add Professional Project Entry
    if (addProfessionalProjectBtn && professionalProjectFields) {
        addProfessionalProjectBtn.addEventListener("click", () => {
            const newEntry = document.createElement("div");
            newEntry.classList.add("professional-project-entry", "border", "p-6", "rounded-lg", "bg-gray-50", "space-y-4");
            newEntry.innerHTML = `
                <div class="grid md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label class="block font-medium text-gray-700">Project Title</label>
                        <input type="text" name="professionalProjectTitle[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Enter project title">
                    </div>
                    <div class="space-y-2">
                        <label class="block font-medium text-gray-700">Role</label>
                        <input type="text" name="professionalProjectRole[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="Your role">
                    </div>
                    <div class="space-y-2">
                        <label class="block font-medium text-gray-700">Duration</label>
                        <input type="text" name="professionalProjectDuration[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Jan 2023 - Present">
                    </div>
                    <div class="space-y-2">
                        <label class="block font-medium text-gray-700">Technologies Used</label>
                        <input type="text" name="professionalProjectTechnologies[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500" placeholder="e.g., Python, React, AWS">
                    </div>
                    <div class="md:col-span-2 space-y-2">
                        <label class="block font-medium text-gray-700">Contribution</label>
                        <textarea name="professionalProjectContribution[]" class="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Describe your contribution" rows="4"></textarea>
                    </div>
                </div>
                <button type="button" class="remove-entry mt-4 px-6 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition">Remove</button>
            `;
            professionalProjectFields.appendChild(newEntry);
        });
    }

    // Add Achievement Entry
    if (addAchievementBtn && achievementsFields) {
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
    }

    // Add Certification Entry
    if (addCertificationBtn && certificationsFields) {
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
    }

    // Add Publication Entry
    if (addPublicationBtn && publicationsFields) {
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
    }

    // Remove Entry
    document.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-entry")) {
            const entry = e.target.closest(".education-entry, .project-entry, .experience-entry, .internship-entry, .achievement-entry, .certification-entry, .publication-entry, .professional-project-entry");
            
            if (!entry) return;
            
            const parent = entry.parentElement;
            if (!parent) return;

            if (entry.classList.contains("achievement-entry") || 
                entry.classList.contains("certification-entry") || 
                entry.classList.contains("publication-entry") || 
                entry.classList.contains("professional-project-entry")) {
                entry.remove();
            } else if (parent.children.length > 1) {
                entry.remove();
            } else {
                alert("Default fields cannot be removed.");
            }
        }
    });

    // Form Submission - only if form exists
    if (resumeForm) {
        resumeForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            if (!agreeTermsCheckbox?.checked) {
                alert('You must agree to the Terms of Use and Privacy Policy to continue.');
                return;
            }

            // Get or create unique ID
            let uniqueId = getCookie('uid');
            if (!uniqueId) {
                uniqueId = generateUUID();
                setCookie('uid', uniqueId, 5); // Store for 5 minutes
            }

            // Show loading state
            const submitButton = resumeForm.querySelector('button[type="submit"]');
            if (!submitButton) return;
            
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
                    uid: uniqueId,
                    templateFormat: getRandomFormat(),
                    name: formDataObj.name || '',
                    email: formDataObj.email || '',
                    phone: formDataObj.phone || '',
                    linkedin: formDataObj.linkedin || '',
                    github: formDataObj.github || '',
                    website: formDataObj.website || '',
                    profileType: formDataObj.profileType || 'student',
                    desiredRole: formDataObj.desiredRole || '',
                    desiredCompany: formDataObj.desiredCompany || '',
                    generateCoverLetter: formDataObj.generateCoverLetter === "on",
                    additionalSkills: formDataObj.additionalSkills || '',
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
                            institution: formDataObj.institution[i] || '',
                            degree: formDataObj.degree[i] || '',
                            graduationYear: formDataObj.graduationYear[i] || '',
                            grade: formDataObj.grade[i] || '',
                        });
                    }
                }

                // Process projects
                if (formDataObj.projectTitle) {
                    for (let i = 0; i < formDataObj.projectTitle.length; i++) {
                        if (formDataObj.projectTitle[i]) {
                            finalData.projects.push({
                                projectTitle: formDataObj.projectTitle[i] || '',
                                projectRole: formDataObj.projectRole[i] || '',
                                projectDuration: formDataObj.projectDuration[i] || '',
                                technologiesUsed: formDataObj.projectTechnologies[i] || '',
                                contribution: formDataObj.contribution[i] || '',
                            });
                        }
                    }
                }

                // Process internships
                if (formDataObj.profileType === "student" && formDataObj.internship === "yes" && formDataObj.internship_organization) {
                    for (let i = 0; i < formDataObj.internship_organization.length; i++) {
                        if (formDataObj.internship_organization[i] || formDataObj.internship_role[i] || 
                            formDataObj.internship_duration[i] || formDataObj.internship_contribution[i]) {
                            finalData.internships.push({
                                organization: formDataObj.internship_organization[i] || '',
                                role: formDataObj.internship_role[i] || '',
                                duration: formDataObj.internship_duration[i] || '',
                                technologiesUsed: formDataObj.internship_technologies[i] || '',
                                contribution: formDataObj.internship_contribution[i] || ''
                            });
                        }
                    }
                }

                // Process work experience
                if (formDataObj.company) {
                    for (let i = 0; i < formDataObj.company.length; i++) {
                        if (formDataObj.company[i] || formDataObj.jobTitle[i] || 
                            formDataObj.workDuration[i] || formDataObj.responsibilities[i]) {
                            finalData.experience.push({
                                company: formDataObj.company[i] || '',
                                jobTitle: formDataObj.jobTitle[i] || '',
                                workDuration: formDataObj.workDuration[i] || '',
                                technologiesUsed: formDataObj.experienceTechnologies ? formDataObj.experienceTechnologies[i] : '',
                                responsibilities: formDataObj.responsibilities[i] || ''
                            });
                        }
                    }
                }

                // Process professional projects
                if (formDataObj.professionalProjectTitle) {
                    for (let i = 0; i < formDataObj.professionalProjectTitle.length; i++) {
                        if (formDataObj.professionalProjectTitle[i]) {
                            finalData.projects.push({
                                projectTitle: formDataObj.professionalProjectTitle[i] || '',
                                projectRole: formDataObj.professionalProjectRole[i] || '',
                                projectDuration: formDataObj.professionalProjectDuration[i] || '',
                                technologiesUsed: formDataObj.professionalProjectTechnologies[i] || '',
                                contribution: formDataObj.professionalProjectContribution[i] || '',
                            });
                        }
                    }
                }

                // Process achievements
                if (formDataObj.achievementTitle) {
                    for (let i = 0; i < formDataObj.achievementTitle.length; i++) {
                        finalData.achievements.push({
                            title: formDataObj.achievementTitle[i] || '',
                            date: formDataObj.achievementDate[i] || '',
                            description: formDataObj.achievementDescription[i] || '',
                        });
                    }
                }

                // Process certifications
                if (formDataObj.certificationTitle) {
                    for (let i = 0; i < formDataObj.certificationTitle.length; i++) {
                        finalData.certifications.push({
                            title: formDataObj.certificationTitle[i] || '',
                            issuer: formDataObj.certificationIssuer[i] || '',
                            date: formDataObj.certificationDate[i] || '',
                            certificateNumber: formDataObj.certificationNumber[i] || '',
                            validity: formDataObj.certificationValidity[i] || '',
                        });
                    }
                }

                // Process publications
                if (formDataObj.publicationTitle) {
                    for (let i = 0; i < formDataObj.publicationTitle.length; i++) {
                        finalData.publications.push({
                            title: formDataObj.publicationTitle[i] || '',
                            authors: formDataObj.publicationAuthors[i] || '',
                            link: formDataObj.publicationLink[i] || '',
                        });
                    }
                }

                // Collection of PDFs to display
                const pdfs = {};

                // Set up resume generation
                const resumePromise = fetch('https://immortal-quetzal-scarcely.ngrok-free.app/generate/generate_resume', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(finalData)
                });

                // Set up cover letter generation if requested
                let coverLetterPromise = null;
                if (finalData.generateCoverLetter) {
                    coverLetterPromise = fetch('https://immortal-quetzal-scarcely.ngrok-free.app/generate/generate_cover_letter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(finalData)
                    });
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
                // downloadObjectAsJson(finalData, "resume-data");

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while generating your documents. Please try again.');
            } finally {
                // Restore button state
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalButtonText;
                }
            }
        });
    }

    // PDF Preview Modal Function
    function showPdfPreviewModal(pdfs, userName) {
        if (!pdfs?.resume) {
            console.error('No PDFs to display');
            return;
        }

        // Create modal container
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[1000] p-4 animate-fadeIn';
        modal.style.animation = 'fadeIn 0.2s ease-out';
        
        // Add styles if not already present
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
                    width: 95%;
                    max-width: 900px;
                    max-height: 90vh;
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
                    height: 50vh;
                    min-height: 300px;
                    overflow: auto;
                }
                @media screen and (max-width: 768px) {
                    .pdf-iframe-container {
                        height: 40vh;
                    }
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
        
        // Create modal HTML
        modal.innerHTML = `
        <div class="bg-white rounded-xl shadow-2xl w-full max-w-5xl flex flex-col animate-slideIn overflow-hidden" 
            style="animation: slideIn 0.3s ease-out; max-height: 90vh; margin: 0 10px;">
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
                    <button class="pdf-tab active flex-1 py-3 px-2 border-b-2 border-blue-600 text-blue-600 font-medium text-sm md:text-base" 
                            data-tab="resume">
                        Resume
                    </button>
                    ${pdfs.coverLetter ? `
                    <button class="pdf-tab flex-1 py-3 px-2 border-b-2 border-transparent text-gray-600 hover:text-blue-600 text-sm md:text-base" 
                            data-tab="coverLetter">
                        Cover Letter
                    </button>
                    ` : ''}
                </div>
            </div>
            
            <!-- Two-column layout for content preview and actions -->
            <div class="flex flex-col lg:flex-row flex-1 overflow-hidden">
                <!-- Left column - Document preview -->
                <div class="w-full lg:w-3/5 bg-gray-50 p-4 overflow-auto h-64 sm:h-80 md:h-96 lg:h-auto">
                    <div id="tab-content-resume" class="tab-content block w-full" style="height: 60vh;">
                        <iframe src="${pdfs.resume.url}#toolbar=0&navpanes=0" class="w-full h-full rounded-lg shadow border" frameborder="0" style="background-color: white;"></iframe>
                    </div>
                    ${pdfs.coverLetter ? `
                    <div id="tab-content-coverLetter" class="tab-content hidden h-full">
                        <iframe src="${pdfs.coverLetter.url}#toolbar=0&navpanes=0" class="w-full h-full rounded-lg shadow border" frameborder="0" style="background-color: white;"></iframe>
                    </div>
                    ` : ''}
                </div>
                
                <!-- Right column - Actions panel -->
                 <div class="w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l flex flex-col overflow-y-auto">
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
                        
                        ${pdfs.coverLetter ? `
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
                        ` : ''}
                        
                    
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
                                
                                ${pdfs.coverLetter ? `
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
                                ` : ''}
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

        // Add modal to DOM
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
                modal.querySelector(`#tab-content-${tabType}`)?.classList.remove('hidden');
                
                // Show appropriate options
                const optionPanels = modal.querySelectorAll('.document-options');
                optionPanels.forEach(panel => panel.classList.add('hidden'));
                modal.querySelector(`#${tabType}-options`)?.classList.remove('hidden');
            });
        });

        // Close button
        const closeButton = modal.querySelector('#closePdfPreview');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = '';
                // Clean up memory
                Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
            });
        }

        // Continue button
        const continueButton = modal.querySelector('#closeAndContinue');
        if (continueButton) {
            continueButton.addEventListener('click', () => {
                modal.remove();
                document.body.style.overflow = '';
                // Clean up memory
                Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
            });
        }

        // Regeneration buttons
        const regenerateButtons = [
            { selector: '#changeResumeFormat', type: 'resume', action: 'format' },
            { selector: '#regenerateResumeContent', type: 'resume', action: 'content' },
            { selector: '#changeCoverLetterFormat', type: 'coverLetter', action: 'format' },
            { selector: '#regenerateCoverLetterContent', type: 'coverLetter', action: 'content' },
            { selector: '#regenerateBoth', type: 'all', action: 'both' }
        ];

        regenerateButtons.forEach(config => {
            const button = modal.querySelector(config.selector);
            if (button) {
                button.addEventListener('click', () => {
                    handleRegeneration(config.type, config.action);
                });
            }
        });

        // Close modal when clicking outside
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
                document.body.style.overflow = '';
                // Clean up memory
                Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
            }
        });

        // Add keyboard support (Escape to close)
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.body.style.overflow = '';
                // Clean up memory
                Object.values(pdfs).forEach(pdf => URL.revokeObjectURL(pdf.url));
                document.removeEventListener('keydown', handleEscape);
            }
        };
        document.addEventListener('keydown', handleEscape);
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

    // Function to handle regeneration of documents
    async function regenerateDocument(type, action) {
        const uid = getCookie('uid');
        if (!uid) {
            alert('User ID not found. Please try again or reload the page.');
            return false;
        }
      
        // Determine the endpoint based on document type
        let endpoint = '';
        if (type === 'resume') {
            endpoint = 'https://immortal-quetzal-scarcely.ngrok-free.app/generate/regenerate_resume';
        } else if (type === 'coverLetter') {
            endpoint = 'https://immortal-quetzal-scarcely.ngrok-free.app/generate/regenerate_cover_letter';
        } else if (type === 'all') {
            // Handle the regeneration of both documents
            const resumeSuccess = await regenerateDocument('resume', action);
            const coverLetterSuccess = await regenerateDocument('coverLetter', action);
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
      
            // Handle PDF response
            const pdfBlob = await response.blob();
            return URL.createObjectURL(pdfBlob);
            
        } catch (error) {
            console.error(`Error regenerating ${type}:`, error);
            alert(`Error regenerating ${type}: ${error.message}`);
            return null;
        }
    }
      
    // Function to handle regeneration actions
    function handleRegeneration(type, action) {
        console.log(`Regenerating ${type} with action: ${action}`);
        
        const modal = document.querySelector('.fixed.inset-0.bg-black\\/70');
        if (!modal) return;
        
        // Show loading state
        const loadingOverlay = document.createElement('div');
        loadingOverlay.className = 'absolute inset-0 bg-white bg-opacity-80 flex items-center justify-center z-10';
        loadingOverlay.innerHTML = `
            <div class="flex flex-col items-center">
                <svg class="animate-spin h-10 w-10 text-blue-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p class="text-lg font-medium text-gray-700">Generating document...</p>
            </div>
        `;
        
        // Add loading overlay to the appropriate area
        if (type === 'resume' || type === 'all') {
            const resumeContent = modal.querySelector('#tab-content-resume');
            if (resumeContent) {
                resumeContent.style.position = 'relative';
                resumeContent.appendChild(loadingOverlay.cloneNode(true));
            }
        }
        
        if (type === 'coverLetter' || type === 'all') {
            const coverLetterContent = modal.querySelector('#tab-content-coverLetter');
            if (coverLetterContent) {
                coverLetterContent.style.position = 'relative';
                coverLetterContent.appendChild(loadingOverlay.cloneNode(true));
            }
        }
        
        // Call the actual regeneration function
        regenerateDocument(type, action).then((pdfUrl) => {
            if (!pdfUrl) {
                showNotification('Failed to regenerate document', 'error');
                return;
            }
            
            // Update the appropriate iframe and download link
            if (type === 'resume' || type === 'all') {
                const iframe = modal.querySelector('#tab-content-resume iframe');
                const downloadLink = modal.querySelector('a[download*="resume"]');
                
                if (iframe) iframe.src = `${pdfUrl}#toolbar=0&navpanes=0`;
                if (downloadLink) {
                    downloadLink.href = pdfUrl;
                    // Update the download filename with a timestamp to ensure fresh download
                    const newName = `resume-${new Date().getTime()}.pdf`;
                    downloadLink.setAttribute('download', newName);
                }
            }
            
            if ((type === 'coverLetter' || type === 'all') && modal.querySelector('#tab-content-coverLetter')) {
                const iframe = modal.querySelector('#tab-content-coverLetter iframe');
                const downloadLink = modal.querySelector('a[download*="cover-letter"]');
                
                if (iframe) iframe.src = `${pdfUrl}#toolbar=0&navpanes=0`;
                if (downloadLink) {
                    downloadLink.href = pdfUrl;
                    // Update the download filename with a timestamp to ensure fresh download
                    const newName = `cover-letter-${new Date().getTime()}.pdf`;
                    downloadLink.setAttribute('download', newName);
                }
            }
            
            showNotification('Document regenerated successfully', 'success');
            
        }).catch(error => {
            console.error('Regeneration error:', error);
            showNotification('Failed to regenerate document', 'error');
            
        }).finally(() => {
            // Remove all loading overlays
            const overlays = modal.querySelectorAll('.absolute.inset-0.bg-white.bg-opacity-80');
            overlays.forEach(overlay => overlay.remove());
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
});