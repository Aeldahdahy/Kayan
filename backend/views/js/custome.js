// const axios = require('axios');
const API_BASE = "http://localhost:2000/public";

const translations = {
    en: {
        loginTitle: "Admin Login",
        usernamePlaceholder: "Username",
        passwordPlaceholder: "Password",
        loginButton: "Login",
        loginError: "Invalid Username or Password",
        loginSuccess: "Login successful!",
        dashboardTitle: "Admin Dashboard",
        manageBrands: "Manage Brands",
        manageCategories: "Manage Categories",
        manageSubcategories: "Manage Subcategories",
        manageProducts: "Manage Products",
        logout: "Logout",
        logoutConfirmation: "Do you want to log out?",
        logoutSuccess: "Logged out successfully!",
        
        // Page Titles
        pageTitleBrands: "Manage Brands",
        pageTitleCategory: "Manage Categories",
        pageTitleSubCategory: "Manage Sub Categories",
        pageTitleProducts: "Manage Products",

        // Form Titles
        formTitleBrands: "Create or Update Brand",
        formTitleCategory: "Create or Update Category",
        formTitleSubCategory: "Create or Update Sub Category",
        formTitleProducts: "Create or Update Product",

        // Save Button Translations
        saveButtonCategory: "Save Category",
        saveButtonBrands: "Save Brand",
        saveButtonSubCategory: "Save Sub Category",
        saveButtonProducts: "Save Product",

        // Other Translations
        categoryNamePlaceholder: "Category Name",
        selectLangOption: "Select Language",
        categoriesTitleCategory: "All Categories",
        categoriesTitleBrands: "All Brands",
        categoriesTitleSubCategory: "All Subcategories",
        categoriesTitleProducts: "All Products",
        idColumn: "ID",
        nameColumn: "Name",
        languageColumn: "Language",
        actionsColumn: "Actions",
        editButton: "Edit",
        deleteButton: "Delete",
        backButton: "Back",
        brandNamePlaceholder: "Brand Name",
        brandCountryPlaceholder: "Brand Country",
        logoColumn: "Logo",
        countryColumn: "Country",
        selectCategoryOption: "Select Category",
        subcategoryNamePlaceholder: "Subcategory Name",
        subcategoriesTitle: "All Subcategories",
        categoryColumn: "Category",
        brandsTitle:"All Brands",
       
        
        // Products
        productNamePlaceholder: "Product Name",
        productDescriptionPlaceholder: "Product Description",
        productSalePlaceholder: "Product Sale Price",
        stockQuantityPlaceholder: "Stock Quantity",
        selectSubcategory: "Select Subcategory",
        selectBrand: "Select Brand",
        productsTitle: "All Products",
        descriptionColumn: "Description",
        salePriceColumn: "Sale Price",
        stockColumn: "Stock",
        subcategoryColumn: "Subcategory",
        brandColumn: "Brand",
        imageColumn: "Image",
        productSalePricePlaceholder:"Product Sale Price",

        // brandFetchError: 'Error fetching brands.',
    },
    ar: {
        loginTitle: "تسجيل دخول المسؤول",
        usernamePlaceholder: "اسم المستخدم",
        passwordPlaceholder: "كلمة المرور",
        loginButton: "تسجيل الدخول",
        loginError: "اسم المستخدم أو كلمة المرور غير صحيحة",
        loginSuccess: "تم تسجيل الدخول بنجاح!",
        dashboardTitle: "لوحة تحكم المسؤول",
        manageBrands: "إدارة العلامات التجارية",
        manageCategories: "إدارة الفئات",
        manageSubcategories: "إدارة الفئات الفرعية",
        manageProducts: "إدارة المنتجات",
        logout: "تسجيل الخروج",
        logoutConfirmation: "هل تريد تسجيل الخروج؟",
        logoutSuccess: "تم تسجيل الخروج بنجاح!",
        
        // Page Titles
        pageTitleBrands: "إدارة العلامات التجارية",
        pageTitleCategory: "إدارة الفئات",
        pageTitleSubCategory: "إدارة الفئات الفرعية",
        pageTitleProducts: "إدارة المنتجات",

        // Form Titles
        formTitleBrands: "إنشاء أو تحديث العلامة التجارية",
        formTitleCategory: "إنشاء أو تحديث الفئة",
        formTitleSubCategory: "إنشاء أو تحديث الفئة الفرعية",
        formTitleProducts: "إنشاء أو تحديث المنتج",

        // Save Button Translations
        saveButtonCategory: "حفظ الفئة",
        saveButtonBrands: "حفظ العلامة التجارية",
        saveButtonSubCategory: "حفظ الفئة الفرعية",
        saveButtonProducts: "حفظ المنتج",

        // Other Translations
        categoryNamePlaceholder: "اسم الفئة",
        selectLangOption: "اختر اللغة",
        categoriesTitleCategory: "جميع الفئات",
        categoriesTitleBrands: "جميع العلامات التجارية",
        categoriesTitleSubCategory: "جميع الفئات الفرعية",
        categoriesTitleProducts: "جميع المنتجات",
        idColumn: "الرقم التعريفي",
        nameColumn: "الاسم",
        languageColumn: "اللغة",
        actionsColumn: "الإجراءات",
        editButton: "تعديل",
        deleteButton: "حذف",
        backButton: "رجوع",
        brandNamePlaceholder: "اسم العلامة التجارية",
        brandCountryPlaceholder: "بلد العلامة التجارية",
        logoColumn: "الشعار",
        countryColumn: "البلد",
        selectCategoryOption: "اختر الفئة",
        subcategoryNamePlaceholder: "اسم الفئة الفرعية",
        subcategoriesTitle: "جميع الفئات الفرعية",
        categoryColumn: "الفئة",
        brandsTitle:"العلامات التجارية",
        
        // Products
        productNamePlaceholder: "اسم المنتج",
        productDescriptionPlaceholder: "وصف المنتج",
        productSalePlaceholder: "سعر المنتج",
        stockQuantityPlaceholder: "الكمية المتوفرة",
        selectSubcategory: "اختر الفئة الفرعية",
        selectBrand: "اختر العلامة التجارية",
        productsTitle: "جميع المنتجات",
        descriptionColumn: "الوصف",
        salePriceColumn: "سعر البيع",
        stockColumn: "الكمية المتوفرة",
        subcategoryColumn: "الفئة الفرعية",
        brandColumn: "العلامة التجارية",
        imageColumn: "الصورة",
        productSalePricePlaceholder:"سعر بيع المنتج",


        
        // brandFetchError: '.حدث خطأ أثناء جلب العلامات التجارية',

    }
};

// Function to update page titles and form titles dynamically based on the page context
function updatePageTitles() {
    const pageTitleElement = document.getElementById('page-title');
    const formTitleElement = document.getElementById('form-title');
    const buttonTitleElement = document.getElementById('save-button');
    
    // Get the current page (Brands, Categories, etc.) based on the URL
    const currentPage = window.location.pathname.split('/').pop().split('.')[0]; // Extract the page name from the URL

    let pageTitleKey = '';
    let formTitleKey = '';
    let buttonTitleKey = '';

    switch (currentPage) {
        case '/brand':
            pageTitleKey = 'pageTitleBrands';
            formTitleKey = 'formTitleBrands';
            buttonTitleKey = 'saveButtonBrands';
            break;
            case '/category':
                pageTitleKey = 'pageTitleCategory';
                formTitleKey = 'formTitleCategory';
                buttonTitleKey = 'saveButtonCategory'
            break;
        case '/subcategory':
            pageTitleKey = 'pageTitleSubCategory';
            formTitleKey = 'formTitleSubCategory';
            buttonTitleKey = 'saveButtonSubCategory'
            break;
        case '/product':
            pageTitleKey = 'pageTitleProducts';
            formTitleKey = 'formTitleProducts';
            buttonTitleKey = 'saveButtonProducts'
            break;
    }

    // Set the page title and form title based on selected language
    const lang = window.selectedLanguage || 'en';
    pageTitleElement.textContent = translations[lang][pageTitleKey];
    formTitleElement.textContent = translations[lang][formTitleKey];
    buttonTitleElement.textContent = translations[lang][formTitleKey];
}


// Helper function to check authentication
function checkAuthToken() {
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert("Please log in to proceed.");
        window.location.href = "/index"; // Redirect to login page if no token found
        return null;
    }
    return token;
}

function loadLanguage(translations, elements) {
    elements.forEach(element => {
        const translationKey = element.getAttribute("data-translate");
        const lang = window.selectedLanguage || "en";  // Default to 'en' if no language selected
        
        // Apply translation to elements with data-translate attribute
        if (translations[lang] && translations[lang][translationKey]) {
            if (element.placeholder) {
                element.placeholder = translations[lang][translationKey];  // Handle placeholders (inputs)
            } else if (element.textContent !== undefined) {
                element.textContent = translations[lang][translationKey];  // Handle text content
            }
        }
    });
}

// Function to set up language change buttons
function setupLanguageButtons(langButtons, translations, elements) {
    langButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const lang = event.target.id.split('-')[0]; // Extract language code from button ID
            window.selectedLanguage = lang; // Store the selected language in the global scope
            localStorage.setItem('selectedLanguage', lang); // Persist language choice in localStorage
            loadLanguage(translations, elements); // Apply the new language
        });
    });
}



// Load default language (either from localStorage or default to 'en')
document.addEventListener('DOMContentLoaded', () => {
    // Default language is set from localStorage or fallback to 'en'
    window.selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
    const langButtons = document.querySelectorAll(".language-toggle button");  // Language toggle buttons
    const translatableElements = document.querySelectorAll("[data-translate]"); // Elements needing translation
    
    // Load the translations for the initial language on page load
    loadLanguage(translations, translatableElements);
    
    // Set up the language buttons to switch languages dynamically
    setupLanguageButtons(langButtons, translations, translatableElements);
    
    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            try {
                const response = await axios.post(`${API_BASE}/loginadminAccount`, {
                    username,
                    password
                });

                if (response.data && response.data.token) {
                    const token = response.data.token;
                    console.log(token);

                    // Save the token in localStorage
                    localStorage.setItem('authToken', token);

                    // Store the selected language in localStorage
                    localStorage.setItem('selectedLanguage', window.selectedLanguage);

                    // Show success message in selected language
                    alert(translations[window.selectedLanguage].loginSuccess);
                    window.location.href = '/dashboard'; // Redirect to dashboard
                } else {
                    // Show error message in selected language
                    alert(translations[window.selectedLanguage].loginError);
                }
            } catch (error) {
                console.error('Login error:', error);
                // Show error message in selected language
                alert(translations[window.selectedLanguage].loginError);
            }
        });
    }

    // Handle Logout 
    const logoutBtn = document.getElementById('logout-btn');
    if(logoutBtn){
        logoutBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            try {
                const token = localStorage.getItem('authToken');
                if(!token){
                    alert('You are not logged in.');
                    window.location.href = '/';
                    return;
                }
                
                const response = await fetch(`${API_BASE}/logout`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Attach token in Authorization header
                    }
                });
    
                if (response.ok) {
                    
                    localStorage.removeItem('authToken');
    
                    
                    alert('Logged out successfully.');
                    window.location.href = '/';
                } else {
                    // Handle errors returned by the server
                    const data = await response.json();
                    alert(`Logout failed: ${data.message || 'Unknown error'}`);
                }
            } catch (error) {
                console.error('Logout error:', error);
                alert('An error occurred during logout. Please try again.');
            }
            
        });
    }

    
    // Execute the asynchronous function to fetch and display brands
    window.fetchBrands = async function() {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/getBrand`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(translations[savedLanguage].brandFetchError || 'Failed to fetch brands'); // Use translations
            }

            const data = await res.json();
            // console.log(data);

            if (data.message && data.brands) {
                brandList.innerHTML = data.brands
                    .map(
                        brand => `
                        <tr>
                            <td>${brand.brand_id}</td>
                            <td>${brand.brand_name}</td>
                            <td>${brand.brand_country}</td>
                            <td>
                                <img src="${brand.brand_logo}" alt="${brand.brand_name}" width="50">
                            </td>
                            <td>${brand.language || 'N/A'}</td>
                            <td>
                                <button onclick="editBrand(${brand.brand_id})">
                                    ${translations[savedLanguage].editButton}
                                </button>
                                <button onclick="deleteBrand(${brand.brand_id})">
                                    ${translations[savedLanguage].deleteButton}
                                </button>
                            </td>
                        </tr>
                    `
                    )
                    .join('');
            } else {
                console.error("Brands data not found in the response", data);
                // alert(translations[savedLanguage].brandLoadFailed || 'Failed to load brands.'); // Use translations
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
            // alert(translations[savedLanguage].brandFetchError || 'Error fetching brands.'); // Use translations
        }
    }; 

    if(document.getElementById('brand-list')){
        fetchBrands();   
    }

    const brandForm = document.getElementById('brandForm');
    if(brandForm){
        brandForm.addEventListener('submit', async (event)=>{
            event.preventDefault();
            const token = localStorage.getItem('authToken'); // Retrieve the token from localStorage
            if (!token) {
                alert(translations[window.selectedLanguage].loginError); // Show message in selected language
                window.location.href = "/"; // Redirect to login page if token is not found
                return;
            }

            const brandId = document.getElementById('brandId').value; // Determine if it's an update
            const brandName = document.getElementById('brandName').value;
            const brandCountry = document.getElementById('brandCountry').value;
            const brandLang = document.getElementById('LangId').value; // Get selected language
            const brandLogo = document.getElementById('brandLogo').files[0]; // Get logo file (if any)

            const formData = new FormData();
            formData.append('brand_name', brandName);
            formData.append('brand_country', brandCountry);
            if (brandLogo) {
                formData.append('brand_logo', brandLogo); // Attach the logo
            }
            if (brandLang !== '') {
                formData.append('language', brandLang); // Append the selected language
            }

            const method = brandId ? 'PUT' : 'POST'; // Decide method based on existence of brandId
            const endpoint = brandId ? `${API_BASE}/updateBrand/${brandId}` : `${API_BASE}/createBrand`;

            try {
                const res = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include the token
                        // Content-Type is automatically set when using FormData
                    },
                    body: formData,
                });
                const response = await res.json();

                if (res.ok) {
                    alert(response.message || translations[window.selectedLanguage][brandId ? 'brandUpdated' : 'brandCreated']);
                    
                    // Reset the form and reload the brands
                    document.getElementById('brandForm').reset();
                    document.getElementById('brandLogoPreview').style.display = 'none'; // Hide the logo preview
                    fetchBrands(); // Reload the list of brands (assuming this function exists)
                } else {
                    console.error('Error response:', response);
                    alert(response.message || translations[window.selectedLanguage].brandSaveFailed);
                }
            } catch (error) {
                console.error('Error during form submission:', error);
                alert(translations[window.selectedLanguage].brandSaveError);
            }
                });
    }

    window.editBrand = async function (id) {
            const token = localStorage.getItem('authToken');
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language
        
            if (!token) {
                alert(translations[savedLanguage].loginError); // Language-aware message
                window.location.href = "/";
                return;
            }
        
            try {
                const res = await fetch(`${API_BASE}/getBrandID/${id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
        
                if (!res.ok) {
                    throw new Error("Failed to fetch brand data.");
                }
        
                const brand = await res.json();
        
                if (brand && brand.brand) {
                    const { brand_id, brand_name, brand_country, language, brand_logo } = brand.brand;
        
                    document.getElementById('brandId').value = brand_id || '';
                    document.getElementById('brandName').value = brand_name || '';
                    document.getElementById('brandCountry').value = brand_country || '';
                    document.getElementById('LangId').value = language || '';
        
                    if (brand_logo) {
                        const logoPath = `${brand_logo}`;
                        const previewElement = document.getElementById('brandLogoPreview');
                        previewElement.src = logoPath;
                        previewElement.style.display = 'block';
                    }
                } else {
                    alert("Brand data is incomplete or missing.");
                }
            } catch (error) {
                console.error("Error editing brand:", error);
                alert("Error fetching brand data.");
            }
    }

    window.deleteBrand = async function (id) {
            if (!confirm("Are you sure you want to delete this brand?")) return;
        
            const token = localStorage.getItem('authToken');  // Get token from localStorage
        
            if (!token) {
                alert("Please log in to delete the brand.");
                window.location.href = "index.html";  // Redirect to login if token is not found
                return;
            }
        
            try {
                const res = await fetch(`${API_BASE}/deleteBrand/${id}`, {  // Use URL parameter for the id
                    method: "DELETE",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,  // Add the token in the Authorization header
                    },
                });
        
                if (!res.ok) {
                    throw new Error('Failed to delete brand');
                }
        
                // Reload the brands list after successful deletion
                alert("Brand deleted successfully.");
                fetchBrands();
            } catch (error) {
                console.error('Error deleting brand:', error);
                alert('Error deleting brand.');
            }
    }
    
    // Execute the asynchronous function to fetch and display Categories
    window.fetchCategory = async function(){
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/getCategory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!res.ok) throw new Error('Failed to fetch categories');
            const data = await res.json();
    
            if (data.message && data.categories) {
                const categoryList = document.getElementById('category-list');
                categoryList.innerHTML = data.categories
                    .map(
                        category => `
                        <tr>
                            <td>${category.category_id}</td>
                            <td>${category.category_name}</td>
                            <td>${category.language || 'N/A'}</td>
                            <td>
                                <button onclick="editCategory(${category.category_id})">${translations[savedLanguage].editButton}</button>
                                <button onclick="deleteCategory(${category.category_id})">${translations[savedLanguage].deleteButton}</button>
                            </td>
                        </tr>
                    `
                    )
                    .join('');
            } else {
                console.error("Categories data not found in the response", data);
                alert("Failed to load categories.");
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Error fetching categories.');
        }
    };
     
    if(document.getElementById('category-list')){
        fetchCategory();
    }

    const categoryForm = document.getElementById('categoryForm');
    if(categoryForm){
        categoryForm.addEventListener('submit', async (event) => {
            event.preventDefault();

            const token = localStorage.getItem('authToken');
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language
    
            if (!token) {
                alert(translations[savedLanguage].loginError); // Language-aware message
                window.location.href = "/";
                return;
            }

            const categoryId = document.getElementById('categoryId');
            const categoryName = document.getElementById('categoryName');
            const LangId = document.getElementById('LangId');

            const categoryIdVal = categoryId.value; // Retrieve category ID value
            const categoryNameVal = categoryName.value.trim(); // Get trimmed value for category name
            const categoryLang = LangId.value; // Get the selected language

            if (!categoryNameVal || !categoryLang) {
                alert("Please provide both category name and language.");
                return; // Prevent form submission if either field is empty
            }

            const method = categoryIdVal ? 'PUT' : 'POST'; // Determine whether creating or updating
            const endpoint = categoryIdVal ? `${API_BASE}/updateCategory/${categoryIdVal}` : `${API_BASE}/createCategory`;

            const categoryData = { category_name: categoryNameVal, language: categoryLang };

            try {
                const res = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(categoryData),
                });

                const response = await res.json();
                if (!res.ok) {
                    console.error('API Error:', response);
                    alert(response.message || `Failed to ${categoryIdVal ? 'update' : 'create'} the category.`);
                } else {
                    alert(response.message || `Category ${categoryIdVal ? 'updated' : 'created'} successfully.`);
                    fetchCategory(); // Refresh the category list
                    categoryForm.reset(); // Reset form
                    categoryId.value = ''; // Clear the hidden category ID after the update
                }
            } catch (error) {
                console.error('Error during form submission:', error);
                alert('An error occurred while saving the category.');
            }
        });
    }

    
    window.editCategory = async function(id) {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/getCategoryID/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
            const categoryId = document.getElementById('categoryId');
            const categoryName = document.getElementById('categoryName');
            const LangId = document.getElementById('LangId');

            if (!res.ok) throw new Error("Failed to fetch category data.");
            const category = await res.json();
            if (category && category.category) {
                categoryId.value = category.category.category_id; // Set category ID in hidden input
                categoryName.value = category.category.category_name; // Set category name
                LangId.value = category.category.language; // Set language
            } else {
                alert("Category not found.");
            }
        } catch (error) {
            console.error("Error fetching category data:", error);
            alert("Error fetching category data.");
        }
    };

    window.deleteCategory = async function(id) {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }
        if (confirm("Are you sure you want to delete this category?")) {
            try {
                const res = await fetch(`${API_BASE}/deleteCategory`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ category_id: id }),
                });
    
                const response = await res.json();
                if (res.ok) {
                    alert(response.message || "Category deleted successfully.");
                    fetchCategory(); // Refresh the category list
                } else {
                    alert(response.message || "Failed to delete the category.");
                }
            } catch (error) {
                console.error('Error deleting category:', error);
                alert('Error deleting category.');
            }
        }
    };

    
    // Execute the asynchronous function to fetch and display Sub Category
    window.fetchSubCategory = async function(){
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/getSubCategory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!res.ok) throw new Error('Failed to fetch sub category');
            const data = await res.json();
            // console.log(data);
    
            if (data.message && data.subCategories) {
                const subcategoryList = document.getElementById('subcategoryList');
                subcategoryList.innerHTML = data.subCategories
                    .map(subCategory => `
                        <tr>
                            <td>${subCategory.sub_category_id}</td>
                            <td>${subCategory.sub_category_name}</td>
                            <td>${subCategory.category_name || 'N/A'}</td> <!-- Adjust this if category name is included -->
                            <td>${subCategory.language || 'N/A'}</td>
                            <td>
                                <button onclick="editSubCategory(${subCategory.sub_category_id})">${translations[savedLanguage].editButton}</button>
                                <button onclick="deleteSubCategory(${subCategory.sub_category_id})">${translations[savedLanguage].deleteButton}</button>
                            </td>
                        </tr>
                    `)
                    .join('');
            }else {
                console.error("Categories data not found in the response", data);
                alert("Failed to load categories.");
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Error fetching categories.');
        }
    };

    if(document.getElementById('subcategoryList')){
        fetchSubCategory();
    }

    const populateCategoryDropdown = async () => {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }

        try {
            // Fetch categories from the backend (adjust URL based on your backend)
            const res = await fetch(`${API_BASE}/getCategory`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Failed to fetch categories');
            }

            const data = await res.json();
            const categoryDropdown = document.getElementById('categoryName');

            if (data.categories && data.categories.length > 0) {
                // Clear the dropdown before populating it
                categoryDropdown.innerHTML = `<option value="" disabled selected>${translations[savedLanguage].selectCategoryOption}</option>`;

                // Loop through each category and create an option
                data.categories.forEach(category => {
                    const option = document.createElement('option');
                    option.value = category.category_id; // Set category_id as the value
                    option.textContent = category.category_name; // Display category_name
                    categoryDropdown.appendChild(option); // Append the option to the dropdown
                });
            } else {
                alert('No categories available.');
            }

        } catch (error) {
            console.error('Error fetching categories:', error);
            alert('Error fetching categories.');
        }
    };

    if(document.getElementById('categoryName')){
        populateCategoryDropdown();
    };

    const subcategoryForm = document.getElementById('subcategoryForm');
    if (subcategoryForm) {
        subcategoryForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const token = localStorage.getItem('authToken');
            const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language
    
            if (!token) {
                alert(translations[savedLanguage].loginError); // Language-aware message
                window.location.href = "/";
                return;
            }
    
            // Get form values
            const subcategoryId = document.getElementById('subcategoryId').value.trim(); // Hidden field for ID
            const subcategoryName = document.getElementById('subcategoryName').value.trim();
            const categoryId = document.getElementById('categoryName').value; // Dropdown for category
            const language = document.getElementById('LangId').value; // Language select
    
            // Validate if all required fields are filled
            if (!subcategoryName || !categoryId || !language) {
                alert(translations[savedLanguage].allFieldsRequired); // Assuming you have a translation for this
                return;
            }
    
            const method = subcategoryId ? 'PUT' : 'POST'; // Determine whether creating or updating
            const endpoint = subcategoryId
                ? `${API_BASE}/updateSubCategory/${subcategoryId}`
                : `${API_BASE}/createSubCategory`;
    
            const subcategoryData = {
                sub_category_name: subcategoryName,
                category_id: categoryId,
                language: language,
            };
    
            try {
                const res = await fetch(endpoint, {
                    method: method,
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(subcategoryData), // Send the subcategory data
                });
    
                const response = await res.json();
    
                if (!res.ok) {
                    console.error('API Error:', response);
                    alert(response.message || `Failed to ${subcategoryId ? 'update' : 'create'} subcategory.`);
                } else {
                    alert(response.message || `Subcategory ${subcategoryId ? 'updated' : 'created'} successfully.`);
                    fetchSubCategory(); // Refresh the subcategory list
                    // subcategoryForm.reset(); // Reset form
                    document.getElementById('subcategoryId').value = ''; // Clear hidden ID field
                }
            } catch (error) {
                console.error('Error during form submission:', error);
                alert('An error occurred while saving the subcategory.');
            }
        });
    }
    
    window.editSubCategory = async function (id) {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    
        if (!token) {
            alert(translations[savedLanguage].loginError);
            window.location.href = "/";
            return;
        }
    
        try {
            const res = await fetch(`${API_BASE}/getSubCategoryID/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!res.ok) throw new Error("Failed to fetch subcategory data.");
    
            const responseData = await res.json();
            console.log('API Response:', responseData);
    
            // Extract data from response
            const subcategory = responseData.data; // Correctly access 'data' field
    
            if (subcategory) {
                // Destructure response data
                const { sub_category_id, sub_category_name, category_id, language } = subcategory;
    
                // Get form elements
                const subcategoryId = document.getElementById('subcategoryId'); // Hidden input
                const subcategoryName = document.getElementById('subcategoryName');
                const categoryName = document.getElementById('categoryName'); // Dropdown
                const LangId = document.getElementById('LangId');
    
                // Populate form inputs
                subcategoryId.value = sub_category_id;
                subcategoryName.value = sub_category_name;
                LangId.value = language;
    
                // Populate category dropdown and pre-select the correct category
                await populateCategoryDropdown(category_id); // Pass `category_id` to pre-select
    
                // Set selected category in dropdown
                categoryName.value = category_id;
    
                // Optional: Scroll to the form or focus on the first input
                subcategoryName.focus();
            } else {
                alert("Subcategory not found.");
            }
        } catch (error) {
            console.error("Error fetching subcategory data:", error);
            alert("Error fetching subcategory data.");
        }
    };
    
    window.deleteSubCategory = async function(id) {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language
        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }

        if (confirm("Are you sure you want to delete this Sub Category?")) {
            try {
                const res = await fetch(`${API_BASE}/deleteSubCategory/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ sub_category_id: id }),
                });
    
                const response = await res.json();
                if (res.ok) {
                    alert(response.message || "Sub Category deleted successfully.");
                    fetchSubCategory(); // Refresh the category list
                } else {
                    alert(response.message || "Failed to delete the Sub Category.");
                }
            } catch (error) {
                console.error('Error deleting Sub Category:', error);
                alert('Error deleting Sub Category.');
            }
        }
    };


    // Execute the asynchronous function to fetch and display Product
    window.fetchProduct = async function() {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language
    
        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/";
            return;
        }
    
        try {
            const res = await fetch(`${API_BASE}/getProduct`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
    
            if (!res.ok) {
                throw new Error(translations[savedLanguage].productFetchError || 'Failed to fetch products'); // Use translations
            }
    
            const data = await res.json();
            console.log(data);
    
            if (data.message && data.products) {
                const productList = document.getElementById('productList'); // Assuming this is the ID for the product list table or container
                
                productList.innerHTML = data.products
                    .map(
                        product => `
                        <tr>
                            <td>${product.product_id}</td>
                            <td>${product.product_name}</td>
                            <td>${product.product_description || 'N/A'}</td>
                            <td>${product.product_sale || 'N/A'}</td>
                            <td>${product.stock_quantity || 'N/A'}</td>
                            <td>${product.language || 'N/A'}</td>
                            <td>${product.sub_category_name || 'N/A'}</td>
                            <td>${product.brand_name || 'N/A'}</td>
                            <td>
                                <img src="${product.product_image}" alt="${product.product_name}" width="50" style="object-fit: cover;">
                            </td>
                            <td>
                                <button onclick="editProduct(${product.product_id})">
                                    ${translations[savedLanguage].editButton}
                                </button>
                                <button onclick="deleteProduct(${product.product_id})">
                                    ${translations[savedLanguage].deleteButton}
                                </button>
                            </td>
                        </tr>
                    `
                    ).join('');
            } else {
                console.error("Products data not found in the response", data);
                // Optionally, alert the user here
                // alert(translations[savedLanguage].productLoadFailed || 'Failed to load products.');
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            // Optionally, alert the user here
            // alert(translations[savedLanguage].productFetchError || 'Error fetching products.');
        }
    };
    
       
    if(document.getElementById('productList')){
        fetchProduct();
    }

    const productForm = document.getElementById('productForm');
if (productForm) {
    // Fetch brands and subcategories once the page loads
    window.fetchSubCategory = async function () {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/"; // Redirect to login page if token is not found
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/getSubCategory`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) throw new Error('Failed to fetch sub category');
            const data = await res.json();

            if (data.message && data.subCategories) {
                const subcategorySelect = document.getElementById('subcategoryId');
                subcategorySelect.innerHTML = `<option value="" disabled selected>Select Subcategory</option>`; // Reset dropdown
                data.subCategories.forEach(subCategory => {
                    subcategorySelect.innerHTML += `<option value="${subCategory.sub_category_id}">${subCategory.sub_category_name}</option>`;
                });
            } else {
                console.error("Subcategories data not found in the response", data);
                alert("Failed to load subcategories.");
            }
        } catch (error) {
            console.error('Error fetching subcategories:', error);
            alert('Error fetching subcategories.');
        }
    };

    window.fetchBrands = async function () {
        const token = localStorage.getItem('authToken');
        const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

        if (!token) {
            alert(translations[savedLanguage].loginError); // Language-aware message
            window.location.href = "/"; // Redirect to login page if token is not found
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/getBrand`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!res.ok) {
                throw new Error(translations[savedLanguage].brandFetchError || 'Failed to fetch brands'); // Use translations
            }

            const data = await res.json();

            if (data.message && data.brands) {
                const brandSelect = document.getElementById('brandId');
                brandSelect.innerHTML = `<option value="" disabled selected>Select Brand</option>`; // Reset dropdown
                data.brands.forEach(brand => {
                    brandSelect.innerHTML += `<option value="${brand.brand_id}">${brand.brand_name}</option>`;
                });
            } else {
                console.error("Brands data not found in the response", data);
                alert(translations[savedLanguage].brandFetchError || 'Failed to load brands');
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
            alert(translations[savedLanguage].brandFetchError || 'Error fetching brands');
        }
    };

    // Fetch brands and subcategories when the page loads
    fetchBrands();
    fetchSubCategory();

    // Product form submission handler
    productForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const token = localStorage.getItem('authToken');
        if (!token) {
            alert(translations[window.selectedLanguage].loginError);
            window.location.href = "/";
            return;
        }

        const productId = document.getElementById('productId').value;
        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;
        const productSale = document.getElementById('productSale').value;
        const stockQuantity = document.getElementById('stockQuantity').value;
        const LangId = document.getElementById('LangId').value;
        const subcategoryId = document.getElementById('subcategoryId').value;
        const brandId = document.getElementById('brandId').value;
        const productImage = document.getElementById('productImage').files[0];

        const formData = new FormData();
        formData.append('product_name', productName);
        formData.append('product_description', productDescription);
        formData.append('product_sale', productSale);
        formData.append('stock_quantity', stockQuantity);
        formData.append('language', LangId);
        formData.append('sub_category_id', subcategoryId);
        formData.append('brand_id', brandId);
        
        if (productImage) {
            formData.append('product_image', productImage); // Attach the product image
        }

        const method = productId ? 'PUT' : 'POST'; // Decide method based on existence of productId
        const endpoint = productId ? `${API_BASE}/updateProduct/${productId}` : `${API_BASE}/createProduct`;

        try {
            const res = await fetch(endpoint, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });
            const response = await res.json();

            if (res.ok) {
                alert(response.message || translations[window.selectedLanguage][productId ? 'productUpdated' : 'productCreated']);
                fetchProduct(); // Reload the list of products (assuming this function exists)
                
                // Reset the form and reload the products
                // document.getElementById('productForm').reset();
                // document.getElementById('productImagePreview').style.display = 'none'; // Hide the image preview
            } else {
                console.error('Error response:', response);
                alert(response.message || translations[window.selectedLanguage].productSaveFailed);
            }
        } catch (error) {
            console.error('Error during form submission:', error);
            alert(translations[window.selectedLanguage].productSaveError);
        }
    });
}


window.editProduct = async function(id) {
    const token = localStorage.getItem('authToken');
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';

    if (!token) {
        alert(translations[savedLanguage].loginError);
        window.location.href = "/";
        return;
    }

    try {
        const res = await fetch(`${API_BASE}/getProductID/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch product data.");
        }

        const product = await res.json();
        console.log(product);

        if (product && product.product) {
            const { product_id, product_name, product_description, product_sale, stock_quantity, language, sub_category_id, brand_id, product_image } = product.product;

            document.getElementById('productId').value = product_id;
            document.getElementById('productName').value = product_name;
            document.getElementById('productDescription').value = product_description;
            document.getElementById('productSale').value = product_sale;
            document.getElementById('stockQuantity').value = stock_quantity;
            document.getElementById('LangId').value = language;
            document.getElementById('subcategoryId').value = sub_category_id;
            document.getElementById('brandId').value = brand_id;

            // Handle product image
            if (product_image) {
                const imagePath = `${API_BASE}${product_image}`; // Make sure this URL is correct
                const previewElement = document.getElementById('productImagePreview');
                previewElement.src = imagePath;
                previewElement.style.display = 'block'; // Show the image preview
            } else {
                // If no image, you can set a default image or hide the preview element
                document.getElementById('productImagePreview').style.display = 'none';
            }
        } else {
            alert("Product data is incomplete or missing.");
        }
    } catch (error) {
        console.error("Error editing product:", error);
        alert("Error fetching product data.");
    }
};




    
window.deleteProduct = async function(id) {
    const token = localStorage.getItem('authToken');
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en'; // Use saved or default language

    if (!token) {
        alert(translations[savedLanguage].loginError); // Language-aware message
        window.location.href = "/";
        return;
    }

    if (confirm("Are you sure you want to delete this product?")) {
        try {
            const res = await fetch(`${API_BASE}/deleteProduct/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const response = await res.json();

            if (res.ok) {
                alert(response.message || "Product deleted successfully.");
                fetchProduct(); // Refresh the product list after successful deletion
            } else {
                alert(response.message || "Failed to delete the product.");
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Error deleting product.');
        }
    }
};
    

});