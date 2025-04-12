/// <reference types='cypress' />

describe('Student Registration page', () => {
  const studentData = {
    firstName: 'Oleksandr',
    lastName: 'Petrenko',
    email: 'oleksandr.petrenko@example.com',
    mobile: '0987654321',
    address: 'Вулиця Тестова 456',
    gender: 'Male',
    dateOfBirth: '01 January,2000',
    subjects: 'Computer Science',
    hobbies: 'Sports',
    state: 'NCR',
    city: 'Delhi'
  };

  const expectedData = [
    { label: 'Student Name', value: `${studentData.firstName} ${studentData.lastName}` },
    { label: 'Student Email', value: studentData.email },
    { label: 'Gender', value: studentData.gender },
    { label: 'Mobile', value: studentData.mobile },
    { label: 'Date of Birth', value: studentData.dateOfBirth },
    { label: 'Subjects', value: studentData.subjects },
    { label: 'Hobbies', value: studentData.hobbies },
    { label: 'Address', value: studentData.address },
    { label: 'State and City', value: `${studentData.state} ${studentData.city}` }
  ];

  beforeEach(() => {
    cy.visit('https://demoqa.com/automation-practice-form');
  });

  it('should fill the form and verify the modal data', () => {
    cy.get('#firstName').type(studentData.firstName);
    cy.get('#lastName').type(studentData.lastName);
    cy.get('#userEmail').type(studentData.email);
    cy.get('label[for="gender-radio-1"]').click();
    cy.get('#userNumber').type(studentData.mobile);

    cy.get('#dateOfBirthInput').click();
    cy.get('.react-datepicker__month-select').select('January');
    cy.get('.react-datepicker__year-select').select('2000');
    cy.get('.react-datepicker__day--001').first().click();

    cy.get('#subjectsInput').type(`${studentData.subjects}{enter}`);
    cy.get('label[for="hobbies-checkbox-1"]').click();
    cy.get('#currentAddress').type(studentData.address);

    cy.get('#state').click();
    cy.contains('#react-select-3-option-0', studentData.state).click();
    cy.get('#city').click();
    cy.contains('#react-select-4-option-0', studentData.city).click();

    cy.get('#submit').click();

    cy.get('.modal-content').should('be.visible');
    expectedData.forEach(({ label, value }) => {
      cy.get('table').contains(label).next().should('contain', value);
    });
  });
});
