
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
    // Remove loader after simulated delay
    if (loaderSpan && loaderSpan.parentNode === messageElement) {
      messageElement.removeChild(loaderSpan);
    }
    messageElement.classList.remove('messageloading');
    const messageSpan = document.createElement("span");
    messageSpan.classList.add("advisrtxt");
    messageSpan.innerHTML = `
      <form class="registration-form">
        <p>Choose a semester for class registration:</p>
        <div class="semester-buttons" id="term_button">
          <!--<button type="button" class="semester-button summerButton" id="summerButton" >Summer 2024</button>
          <button type="button" class="semester-button fallButton" id="fallButton">Fall 2024</button>-->
        </div>
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
                <input class="form-check-input location"  name="location" type="checkbox" role="switch" id="flexSwitchCheckDefault"">
            </div>
          <div>              
            <p>Upon looking at your course catalog and degree requirements, here are the list of <span id="coursesCount"></span> open courses whose prerequisites have already been met. You cannot take more than <span id="maxCredits"></span> credit hours.</p>
        </div>
      </div>
        </div>
        
        
        <div class="course-list" style="display: none;">
          
          <ul class="nav-tabs" id="course_button">
             <li class="nav-item">
              <a class="nav-link coursebtn active" id="registerCourse-tab" data-course_type="add">Add Courses</a>
            </li>
            <li class="nav-item">
              <a class="nav-link coursebtn" id="majorElectives-tab" data-course_type="major_electives">Add Major Electives</a>
            </li>
            <li class="nav-item">
              <a class="nav-link coursebtn" id="otherElectives-tab" data-course_type="other_electives">Add Other Electives</a>
            </li>
            <li class="nav-item">
              <a class="nav-link coursebtn" id="dropCourse-tab" data-course_type="drop">Drop Courses</a>
            </li>
          </ul>
          <div class="tab-content">
            <!-- Register Course Tab Pane -->
            <div class="tab-pane active" id="registerCourse">
              <div class="table-responsive">
                <table class="table table-striped registerCoursetable" id="registerCoursetable">
                  <thead>
                    <tr>
                      <th class="text-center">CRN</th>
                      <th>Subject & Course</th>
                      <th class="text-center">Credits</th>
                      <th>Instructor</th>
                      <th class="text-center">Date</th>
                      <th class="text-center">D & Time</th>
                      <th class="text-center">Location</th>
                      <th>Next Reg. Availability </th>
                      <th class="text-center">Add</th>
                    </tr>
                  </thead>
                  <tbody id="registerCourseBody" class="creditstablebody">
                    <!-- Placeholder for register course table rows -->
                  </tbody>
                </table>
              </div>
            </div>
            <!-- Major Electives Content -->
             <div class="tab-pane" id="majorElectives">
              <div class="alert alert-warning py-1"><ol class="mb-0 ps-2 text-dark" id="majorElectivesNote"></ol></div>
              <div class="table-responsive">
      <table class="table table-striped majorElectivestable" id="majorElectivestable">
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
        <tbody id="majorElectivesBody" class="creditstablebody">
          <!-- Placeholder for major electives table rows -->
        </tbody>
      </table>
    </div>
            </div>
           <!-- Major Electives Content -->
          <!-- Drop Course Content -->
           <div class="tab-pane" id="otherElectives">
           <div class="alert alert-warning py-1"><ol class="mb-0 ps-2 text-dark" id="otherElectivesNote"></ol></div>
 <!--           <div class="accordion" id="selectedCoursesAccordion">
<div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
        Selected Courses
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#selectedCoursesAccordion">
      <div class="accordion-body" id="selectedCoursesList">
      </div>
    </div>
  </div>
</div>-->

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
      <table class="table table-striped otherElectivestable" id="otherElectivestable">
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
        <tbody id="otherElectivesBody" class="creditstablebody">
          <!-- Placeholder for other electives table rows -->
        </tbody>
      </table>
    </div>
           </div>
            <!-- Drop Course Content -->
            <!-- Drop Course Tab Pane -->
            <div class="tab-pane" id="dropCourse">
              <div class="table-responsive">
                <table class="table table-striped dropCoursetable"  id="dropCoursetable">
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
                  <tbody id="dropCourseBody" class="creditstablebody dropCourseBody">
                    <!-- Placeholder for drop course table rows -->
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div id="loader" style="display: none;">Loading...</div>
          <p id="noCoursesMessage" style="display: none;">No courses match your filter criteria.</p>

          <span class="mt-2 d-block"><strong>Total Credits : </strong> <span id="totalcredits">0</span></span>
          <button type="submit" class="submit-button" style="display: none;" id="submitregiButton">Submit</button>
          <p id="class-error" class="mt-2"></p>
          <p id="class-success" class="mt-2"></p>
        </div>
      </form>
          `;
    messageElement.appendChild(messageSpan);
    scrollToBottom();
    const summerButton = document.getElementById('summerButton');
    const fallButton = document.getElementById('fallButton');
    const availabilityDiv = document.querySelector('.availability');
    const courseListDiv = document.querySelector('.course-list');
    const totalCreditsSpan = document.getElementById('totalcredits');

    let defaultCourseType = 'add';
    let defaultTermValue = "202440";
    let defaultMinTotalCredit = 0;
    let defaultMaxTotalCredit = 0;
    //let totalCredits = 0;
    let newTotalCredits = 0;
    let selectedDaysSet = new Set();
    let selectedDays='';
    let registerCoursesdata = '';
    let subject_filters_list = [];
    let subject_filters_selected = '';

    getTermMapping();
    async function getTermMapping() {
      try {
        const response = await fetch(`${base_url}:${services_port}/current_term`);
        const termButtonsJSON = await response.json();
        if (termButtonsJSON.status) {
          const termButtons = termButtonsJSON.data;
          console.log(JSON.stringify(termButtons));
          const term_button = document.querySelector('#term_button');
          // term_button.innerHTML = '<button type="button" class="semester-button term-button"  data-term="' + termButtons.current_term + '" >' + termButtons.current_term + '</button>';
          // const termButtonsArray = Array.from(termButtons);
          // const terms = termButtons.terms;
          let termsHtml = "";
          termButtons.forEach(terms => {
            console.log('My Term:' + terms.Current_Term);
            termsHtml += '<button type="button" class="semester-button summerButton term-button"  data-term="' + terms.Term_Code + '" >' + terms.Current_Term + '</button>';
          });
          term_button.innerHTML = termsHtml;
        } else {
          alert(termButtonsJSON.message);
        }
      } catch (error) {
        console.error('error getting data', error);
      }
    }

    document.getElementById('term_button').addEventListener('click', function (event) {
      if (event.target && event.target.classList.contains('term-button')) {
        const termValue = event.target.getAttribute('data-term');
        defaultTermValue = termValue;
        console.log('Clicked Term:', termValue);
        populateCourseLists(termValue);
        event.target.classList.add('active');
        // availabilityDiv.style.display = 'block';
        courseListDiv.style.display = 'block';
        scrollToBottom();
      }
    });

    document.getElementById('course_button').addEventListener('click', function (event) {
      if (event.target && event.target.classList.contains('coursebtn')) {
        const coursetype = event.target.getAttribute('data-course_type');

        // Array of all possible course types
        const courseTypes = ['registerCourse', 'majorElectives', 'otherElectives', 'dropCourse'];

        // Loop through each course type and toggle the 'active' class based on the clicked button
        courseTypes.forEach(type => {
          const tab = document.getElementById(`${type}-tab`);
          const content = document.getElementById(type);

          if (tab && content) {  // Ensure tab and content exist
            if (coursetype === tab.getAttribute('data-course_type')) {
              tab.classList.add('active');
              content.classList.add('active');
            } else {
              tab.classList.remove('active');
              content.classList.remove('active');
            }
          } else {
            console.error(`Element with ID ${type}-tab or ${type} not found.`);
          }
        });
        console.log('Clicked Course Type:', coursetype);
        defaultCourseType = coursetype;
        //clearFilters()

        coursedatahandle();
        scrollToBottom();
      }
    });
    function clearFilters() {
      // Clear day checkboxes
      const checkboxes = document.querySelectorAll('#days-filter input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.checked = false;
      });

      // Clear online web checkbox
      const onlineWebCheckbox = document.querySelector('.location');
      if (onlineWebCheckbox) {
        onlineWebCheckbox.checked = false;
      }

      // Hide the no courses message if it was displayed
      const noCoursesMessage = document.getElementById('noCoursesMessage');
      if (noCoursesMessage) {
        noCoursesMessage.style.display = 'none';
      }

      // Clear the course table
      // const registerCourseBody = document.querySelector('.creditstablebody');
      // if (registerCourseBody) {
      //   registerCourseBody.innerHTML = '';
      // }
    }

    function populateCourseLists(selectedDays) {
      populateRegisterCourseList(selectedDays);
    }

    async function populateRegisterCourseList(term = '202440') {
      const loader = document.getElementById('loader');
      const noCoursesMessage = document.getElementById('noCoursesMessage');
      try {
        // Show loader
        loader.style.display = 'block';
        registerCourseBody.innerHTML = '';
        availabilityDiv.style.display = 'none';
        // Fetch data from API
        let response = "";
        response = await fetch(`${base_url}:${services_port}/current_term_courses/${stu_id}/${term}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const registerCoursesdataJSON = await response.json();
        if (registerCoursesdataJSON.status) {
          registerCoursesdata = registerCoursesdataJSON.data;
          // availabilityDiv.style.display = 'block';
          //console.log('Total Credits:', registerCoursesdata.min_credit_hours + '-' + registerCoursesdata.max_credit_hours);
          subject_filters_list = registerCoursesdata.subject_filters;
          subject_filters_selected = subject_filters_list[0] ?? '';
          const input = document.getElementById("autosuggestInput");
          input.value = subject_filters_selected;
          console.log('populatelist', subject_filters_list);
          defaultMinTotalCredit = registerCoursesdata.min_credit_hours;
          defaultMaxTotalCredit = registerCoursesdata.max_credit_hours;
          defaultCourseType = registerCoursesdata.type;
          newTotalCredits = registerCoursesdata.total_credit_hours;
          document.getElementById('maxCredits').textContent = defaultMaxTotalCredit;
          totalCreditsSpan.innerHTML = newTotalCredits;
          initializeAutosuggestDropdown(subject_filters_list)
          coursedatahandle();

          // availabilityDiv.style.display = 'block';

        } else {
          registerCourseBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">' + registerCoursesdataJSON.message + '</td></tr>';
          //alert(registerCoursesdataJSON.message);
          // availabilityDiv.style.display = 'none';
        }
        manageFilterVisibility();
      } catch (error) {
        console.error('Error populating register course list:', error);
        // Handle errors here, e.g., display an error message to the user
      } finally {
        // Hide loader
        loader.style.display = 'none';
      }
    }

    function manageFilterVisibility() {
      const hasData =
        registerCoursesdata.add_courses.length > 0 ||
        registerCoursesdata.drop_courses.length > 0 ||
        registerCoursesdata.major_elective_courses.length > 0 ||
        registerCoursesdata.other_elective_courses.length > 0;

      // Show or hide the filter div based on the presence of valid data
      availabilityDiv.style.display = hasData ? 'block' : 'none';
    }
    
    function coursedatahandle(existing_subject = '') {
      console.log('Course received Details:', registerCoursesdata);

      let registerCourseBody = '';
      if (defaultCourseType == 'drop') {
        registerCourseBody = document.getElementById('dropCourseBody');
      } else if (defaultCourseType == 'major_electives') {
        registerCourseBody = document.getElementById('majorElectivesBody');
      } else if (defaultCourseType == 'other_electives') {
        registerCourseBody = document.getElementById('otherElectivesBody');
      } else if (defaultCourseType == 'add') {
        registerCourseBody = document.getElementById('registerCourseBody');
      }
      const input = document.getElementById("autosuggestInput").value.trim();
      const sanitizedSubject = input.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''); // Sanitize search input

      const hasRows = registerCourseBody.getElementsByTagName('tr').length > 0;
      console.log(registerCourseBody.getElementsByTagName('tr').length);

      //if ((hasRows && defaultCourseType == 'other_electives' && existing_subject == subject_filters_selected)) {
      if (hasRows) {
        //alert(hasRows);
        return true;
      }//alert('dsasadsds');

      let registerCourses = registerCoursesdata.add_courses;
      if (defaultCourseType == 'drop') {
        registerCourses = registerCoursesdata.drop_courses;
        //registerCourseBody = document.getElementById('dropCourseBody');
      } else if (defaultCourseType == 'major_electives') {
        registerCourses = registerCoursesdata.major_elective_courses;
        //registerCourseBody = document.getElementById('majorElectivesBody');
        const majorElectivesNote = document.getElementById('majorElectivesNote');
        majorElectivesNote.innerHTML = '';
        registerCoursesdata.major_elective_courses_first_record.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          majorElectivesNote.appendChild(listItem);
        });
      } else if (defaultCourseType == 'other_electives') {
        registerCourses = registerCoursesdata.other_elective_courses;
        let total_other_cred = 0;
        const otherElectivesNote = document.getElementById('otherElectivesNote');
        otherElectivesNote.innerHTML = '';
        registerCoursesdata.other_elective_courses_first_record.forEach(item => {
          const listItem = document.createElement('li');
          listItem.textContent = item;
          otherElectivesNote.appendChild(listItem);
        });
      }
      if (registerCourses.length > 0) {
        if (subject_filters_selected == '' && defaultCourseType == 'other_electives') {
          registerCourseBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">Please select a subject</td></tr>';
          return true;
        }
        // Clear existing content
        registerCourseBody.innerHTML = '';
        const registerList = registerCourses;
        console.log('Course Details:', registerList);
        selectedDaysSet.clear();
        // Format phone numbers in the data array
        console.log("format check", subject_filters_selected + ' - ' + defaultCourseType);
        const registerFormattedData = registerList.map(ADDRESS => {
          return {
            BLOCK_SEQ: ADDRESS['BLOCK_SEQ'] ? ADDRESS['BLOCK_SEQ'] : '',
            NEXT_OPPORTUNITY: ADDRESS['NEXT_OPPORTUNITY'] ? ADDRESS['NEXT_OPPORTUNITY'] : '',
            COREQUISITE_EXISTS: ADDRESS['COREQUISITE_EXISTS'] ? ADDRESS['COREQUISITE_EXISTS'] : '',
            COREQUISITES: ADDRESS['COREQUISITES'] ? ADDRESS['COREQUISITES'] : '',
            SUBJECT_FILTER: ADDRESS['SUBJECT_FILTER'] ? ADDRESS['SUBJECT_FILTER'] : 'filter-class',
            SCRRTST_PRE_REQUISITES: ADDRESS['SCRRTST_PRE_REQUISITES'] ? ADDRESS['SCRRTST_PRE_REQUISITES'] : '',
            SFTREGS_CREDIT_HR: ADDRESS['SFTREGS_CREDIT_HR'],
            SFTREGS_CRN: ADDRESS['SFTREGS_CRN'],
            SFTREGS_CRSE_NAME: ADDRESS['SFTREGS_CRSE_NAME'],
            SFTREGS_CRSE_TITLE: ADDRESS['SFTREGS_CRSE_TITLE'] ? ADDRESS['SFTREGS_CRSE_TITLE'].trim() : '',
            SFTREGS_TERM_CODE: ADDRESS['SFTREGS_TERM_CODE'],
            SPRIDEN_INSTRUCTOR: ADDRESS['SPRIDEN_INSTRUCTOR'],
            SRMEET_DAYS: ADDRESS['SRMEET_DAYS'],
            SRMEET_TIME: ADDRESS['SRMEET_TIME'],
            SSBSECT_ENRL: ADDRESS['SSBSECT_ENRL'],
            SSBSECT_MAX_ENRL: ADDRESS['SSBSECT_MAX_ENRL'],
            SSBSECT_PTRM_DATE: ADDRESS['SSBSECT_PTRM_DATE'],
            SSBSECT_SEATS_AVAIL: ADDRESS['SSBSECT_SEATS_AVAIL'],
            SSBSECT_WAIT_AVAIL: ADDRESS['SSBSECT_WAIT_AVAIL'],
            SSBSECT_WAIT_CAPACITY: ADDRESS['SSBSECT_WAIT_CAPACITY'],
            SSBSECT_WAIT_COUNT: ADDRESS['SSBSECT_WAIT_COUNT'],
            SSRMEET_BLDG_CODE: ADDRESS['SSRMEET_BLDG_CODE'],
            CHECK_BANNER_STATUS: ADDRESS['CHECK_BANNER_STATUS'] ? ADDRESS['CHECK_BANNER_STATUS'] : '',
            min_credit_hours: defaultMinTotalCredit,
            max_credit_hours: defaultMaxTotalCredit,
            type: defaultCourseType
          }
        }).filter(data => data !== null);
        console.log("format data length", registerFormattedData.length);
        console.log("format data", registerFormattedData);
        if (registerFormattedData.length == 0) {
          registerCourseBody.innerHTML = '<tr><td colspan="8" style="text-align: center;">No current courses found for the selected term</td></tr>';
          return true;
        }
        function createCourseRow(registerFormattedData) {
          const row = document.createElement('tr');
          row.classList.add(registerFormattedData.SUBJECT_FILTER);
          row.id = registerFormattedData.SFTREGS_CRN;
          row.setAttribute('data-id', registerFormattedData.SFTREGS_CRN);
          //const locationIcon = registerFormattedData.Location === 'ONLN WEB' ? '<i class="fa-solid fa-earth-americas" aria-hidden="true"></i>' : '';
          row.innerHTML = `
            <td class="text-center">
            <input type="hidden" class="SCRRTST_PRE_REQUISITES" value="${registerFormattedData.SCRRTST_PRE_REQUISITES}"/>
            <input type="hidden" class="SFTREGS_CREDIT_HR" name="SFTREGS_CREDIT_HR" value="${registerFormattedData.SFTREGS_CREDIT_HR}"/>
            <input type="hidden" class="SFTREGS_CRN" name="SFTREGS_CRN" value="${registerFormattedData.SFTREGS_CRN}"/>
            <input type="hidden" class="SFTREGS_CRSE_NAME" name="SFTREGS_CRSE_NAME" value="${registerFormattedData.SFTREGS_CRSE_NAME}"/>
            <input type="hidden" class="SFTREGS_CRSE_TITLE" name="SFTREGS_CRSE_TITLE" value="${registerFormattedData.SFTREGS_CRSE_TITLE}"/>
            <input type="hidden" class="SFTREGS_TERM_CODE" name="SFTREGS_TERM_CODE" value="${registerFormattedData.SFTREGS_TERM_CODE}"/>
            <input type="hidden" class="SPRIDEN_INSTRUCTOR" name="SPRIDEN_INSTRUCTOR" value="${registerFormattedData.SPRIDEN_INSTRUCTOR}"/>
            <input type="hidden" class="SRMEET_DAYS input_Days" name="SRMEET_DAYS" value="${registerFormattedData.SRMEET_DAYS || ''}"/>
            <input type="hidden" class="SRMEET_TIME" name="SRMEET_TIME" value="${registerFormattedData.SRMEET_TIME || ''}"/>
            <input type="hidden" class="SSBSECT_ENRL" name="SSBSECT_ENRL" value="${registerFormattedData.SSBSECT_ENRL}"/>
            <input type="hidden" class="SSBSECT_MAX_ENRL" name="SSBSECT_MAX_ENRL" value="${registerFormattedData.SSBSECT_MAX_ENRL}"/>
            <input type="hidden" class="SSBSECT_PTRM_DATE" name="SSBSECT_PTRM_DATE" value="${registerFormattedData.SSBSECT_PTRM_DATE}"/>
            <input type="hidden" class="SSBSECT_SEATS_AVAIL" name="SSBSECT_SEATS_AVAIL" value="${registerFormattedData.SSBSECT_SEATS_AVAIL}"/>
            <input type="hidden" class="SSBSECT_WAIT_AVAIL" name="SSBSECT_WAIT_AVAIL" value="${registerFormattedData.SSBSECT_WAIT_AVAIL}"/>
            <input type="hidden" class="SSBSECT_WAIT_CAPACITY" name="SSBSECT_WAIT_CAPACITY" value="${registerFormattedData.SSBSECT_WAIT_CAPACITY}"/>
            <input type="hidden" class="SSBSECT_WAIT_COUNT" name="SSBSECT_WAIT_COUNT" value="${registerFormattedData.SSBSECT_WAIT_COUNT}"/>
            <input type="hidden" class="SSRMEET_BLDG_CODE" name="SSRMEET_BLDG_CODE" value="${registerFormattedData.SSRMEET_BLDG_CODE}"/>
            <input type="hidden" class="min_credit_hours" name="min_credit_hours" value="${registerFormattedData.min_credit_hours}"/>
            <input type="hidden" class="max_credit_hours" name="max_credit_hours" value="${registerFormattedData.max_credit_hours}"/>
            <input type="hidden" class="type" name="type" value="${registerFormattedData.type}"/>
            ${registerFormattedData.SFTREGS_CRN}</td>
        <td>${registerFormattedData.SFTREGS_CRSE_NAME}<br>${registerFormattedData.SFTREGS_CRSE_TITLE}</td>
        <!--<td>${registerFormattedData.SFTREGS_CRSE_TITLE}</td>-->
        <td class="text-center">${registerFormattedData.SFTREGS_CREDIT_HR}</td>
        <td>${registerFormattedData.SPRIDEN_INSTRUCTOR}</td>
        <td class="text-center">${registerFormattedData.SSBSECT_PTRM_DATE}</td>
        <td class="text-center">${registerFormattedData.SSRMEET_BLDG_CODE === 'ONLN WEB' ? '<div class="text-center"><i class="fa-solid fa-earth-americas"  data-bs-toggle="tooltip" title="Online Web" aria-hidden="true"></i></div>' : mapAbbreviatedDay(registerFormattedData.SRMEET_DAYS) + '<br>' + registerFormattedData.SRMEET_TIME}</td>
        <!-- <td>${registerFormattedData.SRMEET_TIME || '-'}</td>-->
        <td class="text-center">${registerFormattedData.SSRMEET_BLDG_CODE === 'ONLN WEB' ? 'Online Web' : registerFormattedData.SSRMEET_BLDG_CODE}</td>
        ${registerFormattedData.type == 'add' ? '<td>' + registerFormattedData.NEXT_OPPORTUNITY + '</td>' : ''}
        <td class="text-center">${registerFormattedData.CHECK_BANNER_STATUS.toLowerCase() === 'in_progress'
              ? '<i class="fa-solid fa-rotate d-block"  data-bs-toggle="tooltip" title="In-Progress"></i> In Progress'
              : '<input type="checkbox" class="course-checkbox" data-crn="' + registerFormattedData.SFTREGS_CRN + '" data-day="' + (registerFormattedData.SRMEET_DAYS || '') + '" data-time="' + (registerFormattedData.SRMEET_TIME || '') + '" data-course-id="' + registerFormattedData.SFTREGS_CRSE_NAME + '" data-credits="' + registerFormattedData.SFTREGS_CREDIT_HR + '" data-action="' + defaultCourseType + '" data-location="' + registerFormattedData.SSRMEET_BLDG_CODE + '" data-corequisites="' + registerFormattedData.COREQUISITES + '">'}
        </td>
      `;
          return row;
          initializeTooltips();
        }
        initializeTooltips();
        function mapAbbreviatedDay(dayAbbreviation) {
          switch (dayAbbreviation) {
            case 'M':
              return 'Monday';
            case 'T':
              return 'Tuesday';
            case 'W':
              return 'Wednesday';
            case 'TR':
              return 'Thursday';
            case 'F':
              return 'Friday';
            default:
              return dayAbbreviation; // Return as-is if no mapping is found
          }
        }
        const checkonlineweb = document.getElementById("flexSwitchCheckDefault");
        checkonlineweb.addEventListener('click', handleCheckboxChange);
        
        // Function to handle checkbox change events
        function handleCheckboxChange() {
          const checkboxes = document.querySelectorAll('#days-filter input[type="checkbox"]');
          const checkedCheckboxes = Array.from(checkboxes).filter(checkbox => checkbox.checked);
            selectedDays = checkedCheckboxes.map(checkbox => checkbox.value);
            const filteredCourses = filterCoursesByDays(registerFormattedData, selectedDays); // Ensure registerFormattedData is up-to-date
            // Clear existing table rows
            registerCourseBody.innerHTML = '';

            if (filteredCourses.length === 0) {
              noCoursesMessage.style.display = 'block';
            } else {
              noCoursesMessage.style.display = 'none';
              // Populate table with filtered courses
              filteredCourses.forEach(course => {
                const row = createCourseRow(course);
                registerCourseBody.appendChild(row);
                initializeTooltips();
              });
            }
        }

        // Add event listeners to checkboxes
        const checkboxes = document.querySelectorAll('#days-filter input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', handleCheckboxChange);
        });

        // Iterate through each course and append row to table
        registerFormattedData.forEach(course => {
          const row = createCourseRow(course);
          registerCourseBody.appendChild(row);
          initializeTooltips();
        });

        // Show submit button
        const submitButton = document.querySelector('.submit-button');
        if (submitButton) {
          submitButton.style.display = 'block';
        }
      } else {
        registerCourseBody.innerHTML = '<tr class="notfound"><td colspan="8" style="text-align: center;">No current courses found for the selected term</td></tr>';
      }
      if (defaultCourseType == 'other_electives') {
        check_otherelectiveshide(subject_filters_selected);
      }
    }
    // Function to filter courses based on selected days
    function filterCoursesByDays(courses, selectedDays) {
      // Check if courses is an array
      if (!Array.isArray(courses)) {
        console.error('Expected an array of courses, but got:', courses);
        return []; // Return an empty array to avoid further errors
      }

      const onlineWeb = document.querySelector(".location");
      const includeOnline = onlineWeb.checked;
      const filteredDays = selectedDays.filter(day => day.toLowerCase() !== 'on'); // Avoid modifying the original array
      let matchesSubject = true; // Default to true

      return courses.filter(course => {
        const courseDays = course.SRMEET_DAYS ? splitCourseDays(course.SRMEET_DAYS) : []; // Split the course days into an array
        const hasSelectedDay = filteredDays.length > 0 && courseDays.some(day => filteredDays.includes(day)); // Check if course matches selected days
        const isOnlineCourse = course.SSRMEET_BLDG_CODE === 'ONLN WEB'; // Check if course is online  
        // Apply matchesSubject only in the "others" tab
        if (defaultCourseType === 'other_electives') {
          matchesSubject = subject_filters_selected ? course.SUBJECT_FILTER === subject_filters_selected : true; // Check if course matches selected subject
        }
        // Filtering logic based on selectedDays and includeOnline
        if (filteredDays.length > 0 && includeOnline) {
          // Both days and online web are selected: show courses that match either condition
          return (hasSelectedDay || isOnlineCourse) && matchesSubject;
        } else if (filteredDays.length > 0) {
          // Only days are selected: show courses that match the selected days
          return hasSelectedDay && matchesSubject;
        } else if (includeOnline) {
          // Only online web is selected: show courses that are online
          return isOnlineCourse && matchesSubject;
        } else {
          // Neither days nor online web are selected, show all courses
          return matchesSubject;
        }
      });
    }
    // Function to split the course days string
    function splitCourseDays(daysString) {
      const days = [];
      for (let i = 0; i < daysString.length; i++) {
        // Check for "TR" as a special case
        if (daysString[i] === 'T' && daysString[i + 1] === 'R') {
          days.push('TR');
          i++; // Skip the next character as it's part of "TR"
        } else {
          days.push(daysString[i]);
        }
      }
      return days;
    }
    function classvalidateInputs() {
      const errorMessage = document.querySelector('#class-error');
      const registerCourcesCheck = document.querySelectorAll('.course-checkbox');
      // const primaryCheckboxes = document.querySelectorAll('.primary-checkbox');
      const submitButton = document.getElementById('submitregiButton');
      submitButton.disabled = false;
      let anyChecked = Array.from(registerCourcesCheck).some(checkbox => checkbox.checked);
      if (!anyChecked) {
        showToast('No courses were selected.', 'error');
        return false;
      }
      return true;
    }
    const checkboxContainer = document.getElementById('registerCourseBody');
    checkboxContainer.addEventListener('change', function (event) {
      const checkbox = event.target;
      console.log("default max Credetis", defaultMaxTotalCredit);
      if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
        showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
        checkbox.checked = false;
        return false;
      } else {
        if (checkbox.checked) {
          updateTotalCredits(checkbox);
        } else {
          updateTotalCredits(checkbox, '', 'addcourseuncheck');
        }
      }
    });
    const majorcheckboxContainer = document.getElementById('majorElectivesBody');
    majorcheckboxContainer.addEventListener('change', function (event) {
      const checkbox = event.target;
      console.log("default max Credetis", defaultMaxTotalCredit);
      if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
        showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
        checkbox.checked = false;
        return false;
      } else {
        updateTotalCredits(checkbox);
      }
    });
    const othercheckboxContainer = document.getElementById('otherElectivesBody');
    othercheckboxContainer.addEventListener('change', function (event) {
      const checkbox = event.target;
      console.log("default max Credetis", defaultMaxTotalCredit);
      if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
        showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
        checkbox.checked = false;
        return false;
      } else {
        updateTotalCredits(checkbox);
      }
    });
    const corequisiteboxContainer = document.getElementById('newTbody');
    corequisiteboxContainer.addEventListener('change', function (event) {
      const checkbox = event.target;
      console.log("default max Credetis", defaultMaxTotalCredit);
      if (checkbox.checked && newTotalCredits >= defaultMaxTotalCredit) {
        showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
        checkbox.checked = false;
        return false;
      } else {
        updateTotalCredits(checkbox, 'new_records');
        if (checkbox.checked) {
          const hiddenInput = document.getElementById("newRowAdding_id");
          const hiddenInputValue = hiddenInput.value;
          const maintable = document.getElementById('registerCourseBody'); // Assuming this is an ID
          const crn_mainrow = document.getElementById(hiddenInputValue);
          if (crn_mainrow) {
            const checkboxsub = crn_mainrow.querySelector('input[type="checkbox"]');
            if (!checkboxsub.checked) {
              checkboxsub.checked = true;
              updateTotalCredits(checkboxsub, 'new_records');
              console.log(`Checkbox in row with ID ${hiddenInputValue} was not checked, now it is checked.`);
            } else {
              console.log(`Checkbox in row with ID ${hiddenInputValue} is already checked.`);
            }
          } else {
            console.log(`No row found with ID ${hiddenInput}`);
          }
        }
      }
    });
    const checkboxContainerdrop = document.getElementById('dropCourseBody');
    checkboxContainerdrop.addEventListener('change', function (event) {
      const checkbox = event.target;
      updateTotalCredits(checkbox);
    });
    function updateTotalCredits(checkbox, add_type = '', uncheckcorequisites = '') {
      const day = checkbox.getAttribute('data-day');
      const time = checkbox.getAttribute('data-time');
      const credits = parseFloat(checkbox.dataset.credits);
      const action = checkbox.dataset.action;
      const location = checkbox.dataset.location;
      const crn = checkbox.dataset.crn;
      const corequisites = checkbox.dataset.corequisites;

      if (corequisites !== '' && add_type !== 'new_records' && add_type !== 'new_record_uncheck' && uncheckcorequisites !== 'addcourseuncheck') {
        const corequisiteIds = corequisites.split(',').map(id => id.trim());

        const newTbody = document.getElementById('newTbody');
        newTbody.innerHTML = '';
        corequisiteIds.forEach(function (id) {
          const row = document.getElementById(id);
          if (row) {
            const clonedRow = row.cloneNode(true);
            newTbody.appendChild(clonedRow);
          }
        });

        const myModalElement = document.getElementById('myModal');
        const commonContainer = document.querySelector('.common-container');

        if (commonContainer && myModalElement) {
          // Move modal into the common container
          commonContainer.appendChild(myModalElement);
        }
        // Initialize and show the modal
        var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
          keyboard: true // Enable closing the modal with the keyboard (Escape key)
        });
        myModal.show(); // Show the modal


        const hiddenInput = document.getElementById("newRowAdding_id");
        hiddenInput.value = crn;
        checkbox.checked = false;
        return;
      }

      if ((day && time) || location === 'ONLN WEB') {
        let daytime = `${day}-${time}`;
        if (location === 'ONLN WEB') {
          daytime = `${crn}`;
        }

        if (checkbox.classList.contains('course-checkbox')) {
          if (add_type !== 'new_record_uncheck' && checkbox.checked) {
            console.log('day time', daytime);
            if (selectedDaysSet.has(daytime)) {
              showToast("You can't select courses on the same day & time.", 'error');
              checkbox.checked = false;
              return;
            }
            selectedDaysSet.add(daytime);

            console.log('My Action', action);
            console.log('My credits', credits);

            if (action === 'add' || action === 'major_electives' || action === 'other_electives') {
              newTotalCredits += credits;
            } else if (action === 'drop' && credits <= newTotalCredits) {
              newTotalCredits -= credits;
            } else {
              showToast("Couldn't select when your credits are zero", 'error');
              checkbox.checked = false;
            }
            console.log('My Total Credits', newTotalCredits);
          } else {
            selectedDaysSet.delete(daytime);

            if (action === 'add' || action === 'major_electives' || action === 'other_electives') {
              newTotalCredits -= credits;
            } else if (action === 'drop') {
              newTotalCredits += credits;
            }
          }

          if (add_type === 'new_records') {
            const maintable = document.getElementById('registerCourseBody');
            const crn_mainrow = document.getElementById(crn);
            if (crn_mainrow) {
              const checkbox = crn_mainrow.querySelector('input[type="checkbox"]');
              if (!checkbox.checked) {
                checkbox.checked = true;
                console.log(`Checkbox in row with ID ${crn} was not checked, now it is checked.`);
              } else {
                console.log(`Checkbox in row with ID ${crn} is already checked.`);
              }
            }
          }

          if (newTotalCredits > defaultMaxTotalCredit) {
            showToast(`You can't select more than ${defaultMaxTotalCredit} credits.`, 'error');
            checkbox.checked = false;
            newTotalCredits -= credits;
          } else if (newTotalCredits < 0) {
            newTotalCredits = 0;
          }

          totalCreditsSpan.textContent = newTotalCredits.toFixed(1);
          document.querySelector('#class-error').textContent = "";

          if (uncheckcorequisites === 'addcourseuncheck') {
            const corequisiteIds = corequisites.split(',').map(id => id.trim());
            corequisiteIds.forEach(function (id) {
              const maintable = document.getElementById('registerCourseBody');
              const rowcoreq = document.getElementById(id);
              console.log('uncheck id', id);
              console.log('uncheck row', rowcoreq);
              const checkboxcoreq = rowcoreq ? rowcoreq.querySelector('input[type="checkbox"]') : null;
              console.log('uncheck row', checkboxcoreq);
              if (checkboxcoreq && checkboxcoreq.checked) {
                checkboxcoreq.checked = false;
                updateTotalCredits(checkboxcoreq, 'new_record_uncheck');
              }
            });
          }
        } else {
          showToast('Day and Time should not be empty.', 'error');
          checkbox.checked = false;
        }
      } else {
        showToast('Day and Time should not be empty.', 'error');
        checkbox.checked = false;
      }
    }

    window.onload = function () {
      selectFirstOption(); // Automatically select and filter the first option
    };
    function showDropdown() {
      document.getElementById("autosuggestDropdown").classList.add("autosuggest-show");
    }

    // Function to hide the dropdown
    function hideDropdown() {
      document.getElementById("autosuggestDropdown").classList.remove("autosuggest-show");
    }
    // Function to select an item from the autosuggest dropdown
    function selectItem(event) {
      if (event.target.tagName === 'LI') {
        const input = document.getElementById("autosuggestInput");
        const selectedText = event.target.textContent || event.target.innerText;
        input.value = selectedText; // Set the input value to the selected item
        subject_filters_selected = selectedText;
        const sanitizedSubject = subject_filters_selected.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '');
        clearFilters();
        check_otherelectiveshide(sanitizedSubject);
        // Hide the dropdown after selection
        //filterCoursesByDays(registerCoursesdata, selectedDays)
        hideDropdown();
      }
    }
    function check_otherelectiveshide(sanitizedSubject) {
      const rows = document.querySelectorAll('.otherElectivestable tbody tr');
      console.log('Filtering rows with class:', sanitizedSubject);
      rows.forEach(row => {
        if (row.classList.contains(sanitizedSubject)) {
          row.style.display = ""; // Show matching rows
        } else {
          row.style.display = "none"; // Hide non-matching rows
        }
      });
    }
    // Function to populate the dropdown with dynamic content
    function populateDropdown(subject_filters_list) {
      // const sampleData = [
      //   'About', 'Base', 'Blog', 'Contact', 'Custom',
      //   'Support', 'Tools', 'Extra Item 1', 'Extra Item 2',
      //   'Extra Item 3', 'Extra Item 4', 'Extra Item 5', 'Extra Item 6'
      // ];
      const dropdownList = document.getElementById("autosuggestList");
      dropdownList.innerHTML = ''; // Clear any existing content

      subject_filters_list.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        dropdownList.appendChild(li);
      });
    }

    // Function to filter the suggestions based on input value
    function filterFunction() {
      const input = document.getElementById("autosuggestInput");
      const filter = input.value.toUpperCase();
      const dropdownList = document.getElementById("autosuggestList");
      const li = dropdownList.getElementsByTagName("li");
      let matchFound = false;

      for (let i = 0; i < li.length; i++) {
        const txtValue = li[i].textContent || li[i].innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          li[i].style.display = "";
          matchFound = true;
        } else {
          li[i].style.display = "none";
        }
      }

      // Show or hide the dropdown based on match found
      if (matchFound) {
        showDropdown();
      } else {
        hideDropdown();
      }
    }

    // Function to handle item selection
    // Function to select and filter based on the first option by default
    function selectFirstOption() {
      const autosuggestList = document.getElementById('autosuggestList');
      const firstOption = autosuggestList.querySelector('li:first-child');

      if (firstOption) {
        // Trigger the same logic as selecting an item from the dropdown
        selectItem({ target: firstOption });
      }
    }
    function initializeAutosuggestDropdown(subject_filters_list) {
      populateDropdown(subject_filters_list); // Populate dropdown dynamically
      const inputElement = document.getElementById("autosuggestInput");
      inputElement.addEventListener('keyup', filterFunction);
      inputElement.addEventListener('click', showDropdown);
      inputElement.addEventListener('focus', showDropdown);
      document.getElementById("autosuggestList").addEventListener('click', selectItem);
    }
    const form = document.querySelector('.registration-form');
    const successMessage = form.querySelector('#class-success');
    form.addEventListener('submit', async function (event) {
      event.preventDefault(); // Prevent default form submission behavior
      console.time('SubmitHandler');

      scrollToBottom();
      var postCheck = classvalidateInputs();
      console.log(postCheck);
      if (!postCheck) {
        return false;
      }
      console.log('defaultCourseType:', defaultCourseType);

      let rows = [];
      rows = Array.from(document.querySelectorAll('tbody.creditstablebody tr'));
      const registerCources = rows
        .filter(row => {
          const checkbox = row.querySelector('.course-checkbox');
          return checkbox && checkbox.checked;  // Ensure the checkbox exists and is checked
        })
        .map(row => {
          return {
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
            "SFBETRM_MIN_HRS": row.querySelector('.min_credit_hours').value,
            "SFBETRM_MHRS_OVER": row.querySelector('.max_credit_hours').value,
            "TYPE": row.querySelector('.type').value == 'drop' ? 'drop' : 'add',
            "STU_ID": stu_id,//row.querySelector('.STU_ID').value,
            "STATUS_BANNER": 'NEW',
            "UPDATED_BY": "ADVISOR AI BOT"
          };
        });
      try {
        const response = await fetch(`${base_url}:${services_port}/submit_course_details`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ data: registerCources, 'student_id': stu_id, 'type': defaultCourseType })
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const dataJson = await response.json();
        if (dataJson.status) {
          // successMessage.textContent = 'Class data updated successfully.';
          showToast('Class data updated successfully.', 'success');
          successMessage.style.display = 'block';
          setTimeout(() => {
            successMessage.style.display = 'none';
          }, 5000);
        } else {
          errorMessage.textContent = dataJson.message;
          errorMessage.style.display = 'block';
          setTimeout(() => {
            errorMessage.style.display = 'none';
          }, 5000);
        }
      } catch (error) {
        console.error('Error populating register course list. Please try again.', error);
        // Display error message to the user
        // errorMessage.textContent = 'Error adding phone numbers. Please try again.';
        showToast('Error populating register course list. Please try again.', 'error');
        successMessage.style.display = 'success';
      }
      scrollToBottom();
    });
    scrollToBottom();
  }, 100);
}
// Your existing tab button code here...

