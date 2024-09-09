
function displayClassRegistrationForm() {
  const chatContent = document.getElementById('chat-content');
  const messageElement = document.createElement('div');
  messageElement.classList.add('chat-message', 'bot-message', 'messageloading');

  const botSpan = document.createElement("span");
  botSpan.classList.add("bot");
  botSpan.innerHTML = `<img src="../static/assets/bot.png" width="30" height="30" alt="bot Image">`;
  messageElement.appendChild(botSpan);

  const loaderSpan = dLoader();
  loaderSpan.classList.add("advisrtxt");
  messageElement.appendChild(loaderSpan);

  chatContent.appendChild(messageElement);
  scrollToBottom();
  // Simulate delay to demonstrate loader
  setTimeout(() => {
    document.addEventListener('DOMContentLoaded', () => {
      removeLoader();
      setupMessageContent();
      fetchTerms();
      setupEventListeners();
    });
    
    function removeLoader() {
      const loaderSpan = document.querySelector('#loader');
      if (loaderSpan) {
        loaderSpan.parentNode.removeChild(loaderSpan);
      }
      document.querySelector('#messageElement').classList.remove('messageloading');
    }
    
    function setupMessageContent() {
      const messageElement = document.querySelector('#messageElement');
      const messageSpan = document.createElement("span");
      messageSpan.classList.add("advisrtxt");
      messageSpan.innerHTML = `
        <form class="registration-form">
          <p>Choose a semester for class registration:</p>
          <div class="semester-buttons" id="term_button"></div>
          <div class="availability" style="display: none;">
            <label>What days are you available from Monday through Friday?</label>
            <div class="days" id="days-filter">
              <label><input type="checkbox" name="days" value="M" id="checkboxMonday"> Monday</label>
              <label><input type="checkbox" name="days" value="T" id="checkboxTuesday"> Tuesday</label>
              <label><input type="checkbox" name="days" value="W" id="checkboxWednesday"> Wednesday</label>
              <label><input type="checkbox" name="days" value="TR" id="checkboxThursday"> Thursday</label>
              <label><input type="checkbox" name="days" value="F" id="checkboxFriday"> Friday</label>&nbsp; | &nbsp; 
              <div class="form-check form-switch">
                <label class="form-check-label" for="flexSwitchCheckDefault">Online Web <i class="fa-solid fa-earth-americas" aria-hidden="true"></i></label>
                <input class="form-check-input location" name="location" type="checkbox" role="switch" id="flexSwitchCheckDefault">
              </div>
              <p>Upon looking at your course catalog and degree requirements, here are the list of <span id="coursesCount"></span> open courses whose prerequisites have already been met. You cannot take more than <span id="maxCredits"></span> credit hours.</p>
            </div>
          </div>
          <div class="course-list" style="display: none;">
            <ul class="nav-tabs" id="course_button">
              <li class="nav-item"><a class="nav-link coursebtn active" id="registerCourse-tab" data-course_type="add">Add Courses</a></li>
              <li class="nav-item"><a class="nav-link coursebtn" id="majorElectives-tab" data-course_type="major_electives">Add Major Electives</a></li>
              <li class="nav-item"><a class="nav-link coursebtn" id="otherElectives-tab" data-course_type="other_electives">Add Other Electives</a></li>
              <li class="nav-item"><a class="nav-link coursebtn" id="dropCourse-tab" data-course_type="drop">Drop Courses</a></li>
            </ul>
            <div class="tab-content">
              <div class="tab-pane active" id="registerCourse">
                <div class="table-responsive">
                  <table class="table table-striped registerCoursetable">
                    <thead>
                      <tr>
                        <th class="text-center">CRN</th>
                        <th>Subject & Course</th>
                        <th class="text-center">Credits</th>
                        <th>Instructor</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">D & Time</th>
                        <th class="text-center">Location</th>
                        <th class="text-center">Add</th>
                      </tr>
                    </thead>
                    <tbody id="registerCourseBody" class="creditstablebody"></tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane" id="majorElectives">
                <div class="alert alert-warning py-1"><ol class="mb-0 ps-2 text-dark" id="majorElectivesNote"></ol></div>
                <div class="table-responsive">
                  <table class="table table-striped majorElectivestable">
                    <thead>
                      <tr>
                        <th class="text-center">CRN</th>
                        <th>Subject & Course</th>
                        <th class="text-center">Credits</th>
                        <th>Instructor</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">D & Time</th>
                        <th class="text-center">Location</th>
                        <th class="text-center">Add</th>
                      </tr>
                    </thead>
                    <tbody id="majorElectivesBody" class="creditstablebody"></tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane" id="otherElectives">
                <div class="alert alert-warning py-1"><ol class="mb-0 ps-2 text-dark" id="otherElectivesNote"></ol></div>
                <div class="d-flex mb-2 align-items-center justify-content-between">
                  <label>Please change the subject to view other courses:</label>
                  <div class="autosuggest-dropdown text-right my-0">
                    <input type="text" id="autosuggestInput" placeholder="Search..">
                    <div id="autosuggestDropdown" class="autosuggest-dropdown-content">
                      <ul id="autosuggestList"></ul>
                    </div>
                  </div>
                </div>
                <div class="table-responsive">
                  <table class="table table-striped otherElectivestable">
                    <thead>
                      <tr>
                        <th class="text-center">CRN</th>
                        <th>Subject & Course</th>
                        <th class="text-center">Credits</th>
                        <th>Instructor</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">D & Time</th>
                        <th class="text-center">Location</th>
                        <th class="text-center">Add</th>
                      </tr>
                    </thead>
                    <tbody id="otherElectivesBody" class="creditstablebody"></tbody>
                  </table>
                </div>
              </div>
              <div class="tab-pane" id="dropCourse">
                <div class="table-responsive">
                  <table class="table table-striped dropCoursetable">
                    <thead>
                      <tr>
                        <th class="text-center">CRN</th>
                        <th>Subject & Course</th>
                        <th class="text-center">Credits</th>
                        <th>Instructor</th>
                        <th class="text-center">Date</th>
                        <th class="text-center">D & Time</th>
                        <th class="text-center">Location</th>
                        <th class="text-center">Drop</th>
                      </tr>
                    </thead>
                    <tbody id="dropCourseBody" class="creditstablebody dropCourseBody"></tbody>
                  </table>
                </div>
              </div>
            </div>
            <div id="loader" style="display: none;">Loading...</div>
            <p id="noCoursesMessage" style="display: none;">No courses match your filter criteria.</p>
            <span class="mt-2 d-block"><strong>Total Credits: </strong> <span id="totalcredits">0</span></span>
            <button type="submit" class="submit-button" style="display: none;" id="submitregiButton">Submit</button>
            <p id="class-error" class="mt-2"></p>
            <p id="class-success" class="mt-2"></p>
          </form>
        `;
      messageElement.appendChild(messageSpan);
      scrollToBottom();
    }
    
    async function fetchTerms() {
      try {
        const response = await fetch(`${base_url}:${services_port}/current_term`);
        const termButtonsJSON = await response.json();
        if (termButtonsJSON.status) {
          const termButtons = termButtonsJSON.data;
          const term_button = document.querySelector('#term_button');
          const termsHtml = termButtons.map(term => 
            `<button type="button" class="semester-button term-button" data-term="${term.Term_Code}">${term.Current_Term}</button>`
          ).join('');
          term_button.innerHTML = termsHtml;
        } else {
          alert(termButtonsJSON.message);
        }
      } catch (error) {
        console.error('Error fetching terms:', error);
      }
    }
    
    function setupEventListeners() {
      document.getElementById('term_button').addEventListener('click', handleTermClick);
      document.getElementById('course_button').addEventListener('click', handleCourseTabClick);
    }
    
    function handleTermClick(event) {
      if (event.target && event.target.classList.contains('term-button')) {
        const termValue = event.target.getAttribute('data-term');
        defaultTermValue = termValue;
        populateCourseLists(termValue);
        event.target.classList.add('active');
        document.querySelector('.course-list').style.display = 'block';
        scrollToBottom();
      }
    }
    
    function handleCourseTabClick(event) {
      if (event.target && event.target.classList.contains('coursebtn')) {
        const coursetype = event.target.getAttribute('data-course_type');
        const courseTypes = ['registerCourse', 'majorElectives', 'otherElectives', 'dropCourse'];
    
        courseTypes.forEach(type => {
          const tab = document.getElementById(`${type}-tab`);
          const content = document.getElementById(type);
          if (tab && content) {
            tab.classList.toggle('active', coursetype === tab.getAttribute('data-course_type'));
            content.classList.toggle('active', coursetype === tab.getAttribute('data-course_type'));
          } else {
            console.error(`Element with ID ${type}-tab or ${type} not found.`);
          }
        });
    
        defaultCourseType = coursetype;
        coursedatahandle();
        scrollToBottom();
      }
    }
    

    // DOM elements
  const summerButton = document.getElementById('summerButton');
  const fallButton = document.getElementById('fallButton');
  const availabilityDiv = document.querySelector('.availability');
  const courseListDiv = document.querySelector('.course-list');
  const totalCreditsSpan = document.getElementById('totalcredits');
  const loader = document.getElementById('loader');
  const noCoursesMessage = document.getElementById('noCoursesMessage');
  const submitButton = document.querySelector('.submit-button');
  const checkOnlineWeb = document.getElementById("flexSwitchCheckDefault");

  // Default values
  const defaults = {
    courseType: 'add',
    term: "202440",
    minTotalCredit: 0,
    maxTotalCredit: 0,
    newTotalCredits: 0,
    selectedDaysSet: new Set(),
    selectedDays: '',
    registerCoursesData: '',
    subjectFiltersList: [],
    subjectFiltersSelected: ''
  };

  // Clear filters and hide messages
  function clearFilters() {
    document.querySelectorAll('#days-filter input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    const onlineWebCheckbox = document.querySelector('.location');
    if (onlineWebCheckbox) onlineWebCheckbox.checked = false;
    if (noCoursesMessage) noCoursesMessage.style.display = 'none';
  }

  // Fetch and populate course data
  async function populateRegisterCourseList(term = defaults.term) {
    try {
      loader.style.display = 'block';
      const response = await fetch(`${base_url}:${services_port}/current_term_courses/${stu_id}/${term}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      if (data.status) {
        defaults.registerCoursesData = data.data;
        defaults.subjectFiltersList = data.data.subject_filters;
        defaults.subjectFiltersSelected = defaults.subjectFiltersList[0] || '';
        document.getElementById("autosuggestInput").value = defaults.subjectFiltersSelected;
        defaults.minTotalCredit = data.data.min_credit_hours;
        defaults.maxTotalCredit = data.data.max_credit_hours;
        defaults.newTotalCredits = data.data.total_credit_hours;
        totalCreditsSpan.textContent = defaults.newTotalCredits;
        initializeAutosuggestDropdown(defaults.subjectFiltersList);
        handleCourseData();
      } else {
        document.getElementById('registerCourseBody').innerHTML = `<tr><td colspan="8" style="text-align: center;">${data.message}</td></tr>`;
      }

      manageFilterVisibility();
    } catch (error) {
      console.error('Error populating register course list:', error);
    } finally {
      loader.style.display = 'none';
    }
  }

  // Manage the visibility of filters
  function manageFilterVisibility() {
    const hasData = ['add_courses', 'drop_courses', 'major_elective_courses', 'other_elective_courses']
      .some(key => defaults.registerCoursesData[key].length > 0);
    availabilityDiv.style.display = hasData ? 'block' : 'none';
  }

  // Handle and display course data
  function handleCourseData() {
    const courseType = defaults.courseType;
    const courseData = defaults.registerCoursesData[`${courseType}_courses`] || [];
    const body = document.getElementById(`${courseType}Body`);
    body.innerHTML = '';

    if (courseData.length === 0) {
      body.innerHTML = '<tr><td colspan="8" style="text-align: center;">No courses found</td></tr>';
      return;
    }

    const rows = courseData.map(createCourseRow);
    body.append(...rows);
    initializeTooltips();
    if (submitButton) submitButton.style.display = 'block';
  }

  // Create a course row
  function createCourseRow(course) {
    const row = document.createElement('tr');
    row.classList.add(course.SUBJECT_FILTER);
    row.id = course.SFTREGS_CRN;
    row.innerHTML = `
      <td class="text-center">${course.SFTREGS_CRN}</td>
      <td>${course.SFTREGS_CRSE_NAME}<br>${course.SFTREGS_CRSE_TITLE}</td>
      <td class="text-center">${course.SFTREGS_CREDIT_HR}</td>
      <td>${course.SPRIDEN_INSTRUCTOR}</td>
      <td class="text-center">${course.SSBSECT_PTRM_DATE}</td>
      <td class="text-center">${course.SSRMEET_BLDG_CODE === 'ONLN WEB' ? '<i class="fa-solid fa-earth-americas" aria-hidden="true"></i>' : mapAbbreviatedDay(course.SRMEET_DAYS) + '<br>' + course.SRMEET_TIME}</td>
      <td class="text-center">${course.SSRMEET_BLDG_CODE === 'ONLN WEB' ? 'Online Web' : course.SSRMEET_BLDG_CODE}</td>
      ${course.type == 'add' ? `<td>${course.NEXT_OPPORTUNITY}</td>` : ''}
      <td class="text-center">${course.CHECK_BANNER_STATUS.toLowerCase() === 'in_progress'
        ? '<i class="fa-solid fa-rotate d-block" aria-hidden="true"></i> In Progress'
        : `<input type="checkbox" class="course-checkbox" data-crn="${course.SFTREGS_CRN}" data-day="${course.SRMEET_DAYS || ''}" data-time="${course.SRMEET_TIME || ''}" data-course-id="${course.SFTREGS_CRSE_NAME}" data-credits="${course.SFTREGS_CREDIT_HR}" data-action="${course.type}" data-location="${course.SSRMEET_BLDG_CODE}" data-corequisites="${course.COREQUISITES}">`
      }</td>
    `;
    return row;
  }

  // Map abbreviated days to full names
  function mapAbbreviatedDay(dayAbbreviation) {
    const daysMap = {
      'M': 'Monday',
      'T': 'Tuesday',
      'W': 'Wednesday',
      'TR': 'Thursday',
      'F': 'Friday'
    };
    return daysMap[dayAbbreviation] || dayAbbreviation;
  }

  // Handle checkbox changes
  function handleCheckboxChange() {
    const checkedCheckboxes = Array.from(document.querySelectorAll('#days-filter input[type="checkbox"]:checked'))
      .map(checkbox => checkbox.value);
    const filteredCourses = filterCoursesByDays(defaults.registerCoursesData[defaults.courseType + '_courses'] || [], checkedCheckboxes);

    const body = document.getElementById(`${defaults.courseType}Body`);
    body.innerHTML = '';

    if (filteredCourses.length === 0) {
      noCoursesMessage.style.display = 'block';
    } else {
      noCoursesMessage.style.display = 'none';
      body.append(...filteredCourses.map(createCourseRow));
    }
  }

  // Event listeners
  checkOnlineWeb.addEventListener('click', handleCheckboxChange);
  document.querySelectorAll('#days-filter input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', handleCheckboxChange);
  });

    
    // Filter courses based on selected days
  function filterCoursesByDays(courses, selectedDays) {
    if (!Array.isArray(courses)) {
      console.error('Expected an array of courses, but got:', courses);
      return [];
    }

    const onlineWeb = document.querySelector(".location");
    const includeOnline = onlineWeb.checked;
    const filteredDays = selectedDays.filter(day => day.toLowerCase() !== 'on');
    const matchesSubject = defaultCourseType === 'other_electives'
      ? subject_filters_selected ? course.SUBJECT_FILTER === subject_filters_selected : true
      : true;

    return courses.filter(course => {
      const courseDays = course.SRMEET_DAYS ? splitCourseDays(course.SRMEET_DAYS) : [];
      const hasSelectedDay = filteredDays.length > 0 && courseDays.some(day => filteredDays.includes(day));
      const isOnlineCourse = course.SSRMEET_BLDG_CODE === 'ONLN WEB';

      if (filteredDays.length > 0 && includeOnline) {
        return (hasSelectedDay || isOnlineCourse) && matchesSubject;
      } else if (filteredDays.length > 0) {
        return hasSelectedDay && matchesSubject;
      } else if (includeOnline) {
        return isOnlineCourse && matchesSubject;
      } else {
        return matchesSubject;
      }
    });
  }

  // Split course days string
  function splitCourseDays(daysString) {
    const days = [];
    for (let i = 0; i < daysString.length; i++) {
      if (daysString[i] === 'T' && daysString[i + 1] === 'R') {
        days.push('TR');
        i++;
      } else {
        days.push(daysString[i]);
      }
    }
    return days;
  }

  // Validate input for class registration
  function classValidateInputs() {
    const errorMessage = document.querySelector('#class-error');
    const registerCoursesCheck = document.querySelectorAll('.course-checkbox');
    const submitButton = document.getElementById('submitregiButton');
    submitButton.disabled = false;
    
    if (!Array.from(registerCoursesCheck).some(checkbox => checkbox.checked)) {
      showToast('No courses were selected.', 'error');
      return false;
    }
    return true;
  }

  // Update credits based on checkbox selection
  function handleCheckboxChange(event, containerId) {
    const checkbox = event.target;
    if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
      showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
      checkbox.checked = false;
      return false;
    } else {
      updateTotalCredits(checkbox, checkbox.checked ? 'addcourse' : 'remove');
    }
  }

  // Event listeners for checkbox changes
  ['registerCourseBody', 'majorElectivesBody', 'otherElectivesBody'].forEach(containerId => {
    document.getElementById(containerId).addEventListener('change', event => handleCheckboxChange(event, containerId));
  });


  // Handle corequisite checkbox changes
  document.getElementById('newTbody').addEventListener('change', function(event) {
    const checkbox = event.target;
    if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
      showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
      checkbox.checked = false;
      return;
    } 
    
    updateTotalCredits(checkbox, 'new_records');
    
    if (checkbox.checked) {
      const hiddenInput = document.getElementById("newRowAdding_id");
      const crn = hiddenInput.value;
      const mainRow = document.getElementById(crn);

      if (mainRow) {
        const checkboxSub = mainRow.querySelector('input[type="checkbox"]');
        if (!checkboxSub.checked) {
          checkboxSub.checked = true;
          updateTotalCredits(checkboxSub, 'new_records');
        }
      }
    }
  });

  // Handle drop course checkbox changes
  document.getElementById('dropCourseBody').addEventListener('change', function(event) {
    updateTotalCredits(event.target);
  });

  // Update total credits based on checkbox state
  function updateTotalCredits(checkbox, addType = '', uncheckCorequisites = '') {
    const day = checkbox.getAttribute('data-day');
    const time = checkbox.getAttribute('data-time');
    const credits = parseFloat(checkbox.dataset.credits);
    const action = checkbox.dataset.action;
    const location = checkbox.dataset.location;
    const crn = checkbox.dataset.crn;
    const corequisites = checkbox.dataset.corequisites;

    if (corequisites && !['new_records', 'new_record_uncheck'].includes(addType) && uncheckCorequisites !== 'addcourseuncheck') {
      updateCorequisites(corequisites, crn);
      return;
    }

    if ((day && time) || location === 'ONLN WEB') {
      const daytime = location === 'ONLN WEB' ? crn : `${day}-${time}`;

      if (checkbox.classList.contains('course-checkbox')) {
        if (addType !== 'new_record_uncheck' && checkbox.checked) {
          if (selectedDaysSet.has(daytime)) {
            showToast("You can't select courses on the same day & time.", 'error');
            checkbox.checked = false;
            return;
          }
          selectedDaysSet.add(daytime);
          adjustTotalCredits(action, credits);
        } else {
          selectedDaysSet.delete(daytime);
          adjustTotalCredits(action, credits, true);
        }

        handleCreditLimit(checkbox);
      } else {
        showToast('Day and Time should not be empty.', 'error');
        checkbox.checked = false;
      }
    } else {
      showToast('Day and Time should not be empty.', 'error');
      checkbox.checked = false;
    }
  }

  function updateCorequisites(corequisites, crn) {
    const corequisiteIds = corequisites.split(',').map(id => id.trim());
    const newTbody = document.getElementById('newTbody');
    newTbody.innerHTML = '';

    corequisiteIds.forEach(id => {
      const row = document.getElementById(id);
      if (row) {
        newTbody.appendChild(row.cloneNode(true));
      }
    });

    const myModal = new bootstrap.Modal(document.getElementById('myModal'), { keyboard: true });
    myModal.show();
    
    document.getElementById("newRowAdding_id").value = crn;
    document.querySelector('input[type="checkbox"]').checked = false;
  }

  function adjustTotalCredits(action, credits, isUnchecking = false) {
    if (action === 'add' || action === 'major_electives' || action === 'other_electives') {
      newTotalCredits += isUnchecking ? -credits : credits;
    } else if (action === 'drop' && credits <= newTotalCredits) {
      newTotalCredits -= isUnchecking ? credits : -credits;
    } else {
      showToast("Couldn't select when your credits are zero", 'error');
      document.querySelector('input[type="checkbox"]').checked = false;
    }
  }

  function handleCreditLimit(checkbox) {
    if (newTotalCredits > defaultMaxTotalCredit) {
      showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
      checkbox.checked = false;
      newTotalCredits -= parseFloat(checkbox.dataset.credits);
    } else if (newTotalCredits < 0) {
      newTotalCredits = 0;
    }

    document.querySelector('#totalCreditsSpan').textContent = newTotalCredits.toFixed(1);
    document.querySelector('#class-error').textContent = "";
  }

  // Auto-select and filter the first dropdown option
  window.onload = function () {
    selectFirstOption();
  };

  function showDropdown() {
    document.getElementById("autosuggestDropdown").classList.add("autosuggest-show");
  }

  function hideDropdown() {
    document.getElementById("autosuggestDropdown").classList.remove("autosuggest-show");
  }

  function selectItem(event) {
    if (event.target.tagName === 'LI') {
      const input = document.getElementById("autosuggestInput");
      const selectedText = event.target.textContent;
      input.value = selectedText;
      subject_filters_selected = selectedText;
      const sanitizedSubject = subject_filters_selected.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
      clearFilters();
      check_otherelectiveshide(sanitizedSubject);
      hideDropdown();
    }
  }

  function check_otherelectiveshide(sanitizedSubject) {
    document.querySelectorAll('.otherElectivestable tbody tr').forEach(row => {
      row.style.display = row.classList.contains(sanitizedSubject) ? "" : "none";
    });
  }

  function populateDropdown(subjectFiltersList) {
    const dropdownList = document.getElementById("autosuggestList");
    dropdownList.innerHTML = '';
    subjectFiltersList.forEach(item => {
      const li = document.createElement('li');
      li.textContent = item;
      dropdownList.appendChild(li);
    });
  }

  function filterFunction() {
    const input = document.getElementById("autosuggestInput");
    const filter = input.value.toUpperCase();
    const li = document.getElementById("autosuggestList").getElementsByTagName("li");
    let matchFound = false;

    Array.from(li).forEach(item => {
      const txtValue = item.textContent.toUpperCase();
      item.style.display = txtValue.indexOf(filter) > -1 ? "" : "none";
      matchFound = matchFound || txtValue.indexOf(filter) > -1;
    });

    matchFound ? showDropdown() : hideDropdown();
  }

  function selectFirstOption() {
    const firstOption = document.getElementById('autosuggestList').querySelector('li:first-child');
    if (firstOption) {
      selectItem({ target: firstOption });
    }
  }

  function initializeAutosuggestDropdown(subjectFiltersList) {
    populateDropdown(subjectFiltersList);
    const inputElement = document.getElementById("autosuggestInput");
    inputElement.addEventListener('keyup', filterFunction);
    inputElement.addEventListener('click', showDropdown);
    inputElement.addEventListener('focus', showDropdown);
    document.getElementById("autosuggestList").addEventListener('click', selectItem);
  }

  // Handle form submission
  document.querySelector('.registration-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    scrollToBottom();
    if (!classValidateInputs()) return;

    const rows = Array.from(document.querySelectorAll('tbody.creditstablebody tr'));
    const registerCourses = rows.filter(row => row.querySelector('.course-checkbox').checked).map(row => ({
      "SCRRTST_PRE_REQUISITES": row.querySelector('.SCRRTST_PRE_REQUISITES').value,
      "SFTREGS_CREDIT_HR": row.querySelector('.SFTREGS_CREDIT_HR').value,
      "SFTREGS_CRN": row.querySelector('.SFTREGS_CRN').value,
      "SFTREGS_CRSE_NAME": row.querySelector('.SFTREGS_CRSE_NAME').value,
      "SFTREGS_CRSE_TITLE": row.querySelector('.SFTREGS_CRSE_TITLE').value,
      "SFTREGS_TERM_CODE": row.querySelector('.SFTREGS_TERM_CODE').value,
      "SPRIDEN_INSTRUCTOR": row.querySelector('.SPRIDEN_INSTRUCTOR').value,
      "SRMEET_DAYS": row.querySelector('.SRMEET_DAYS').value,
      "SRMEET_TIME": row.querySelector('.SRMEET_TIME').value,
      "SSBSECT_ENRL": row.querySelector('.SSBSECT_ENRL').value,
      "SSBSECT_MAX_ENRL": row.querySelector('.SSBSECT_MAX_ENRL').value,
      "SSBSECT_PTRM_DATE": row.querySelector('.SSBSECT_PTRM_DATE').value,
      "SSBSECT_SEATS_AVAIL": row.querySelector('.SSBSECT_SEATS_AVAIL').value,
      "SSBSECT_WAIT_AVAIL": row.querySelector('.SSBSECT_WAIT_AVAIL').value,
      "SSBSECT_WAIT_CAPACITY": row.querySelector('.SSBSECT_WAIT_CAPACITY').value,
      "SSBSECT_WAIT_COUNT": row.querySelector('.SSBSECT_WAIT_COUNT').value,
      "SSRMEET_BLDG_CODE": row.querySelector('.SSRMEET_BLDG_CODE').value,
      "SFBETRM_MIN_HRS": row.querySelector('.SFBETRM_MIN_HRS').value
    }));
    
    try {
      const response = await fetch('/register_courses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerCourses)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      showToast(result.message, 'success');
      resetForm();
    } catch (error) {
      showToast('An error occurred while submitting the form.', 'error');
    }
  });

  function scrollToBottom() {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function classValidateInputs() {
    // Add your validation logic here
    return true;
  }

  function resetForm() {
    document.querySelector('.registration-form').reset();
  }


    scrollToBottom();
  }, 100);
}
// Your existing tab button code here...