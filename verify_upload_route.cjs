const FormData = require('form-data');
const fs = require('fs');

const dummyId = '5f8d0423a54d640c14c80217'; // Valid 24-char hex string

async function testUpload() {
    const form = new FormData();
    // Create a dummy file with PDF extension
    fs.writeFileSync('test_upload.pdf', 'This is a dummy PDF content');
    form.append('file', fs.createReadStream('test_upload.pdf'), {
        filename: 'test_upload.pdf',
        contentType: 'application/pdf',
    });
    form.append('title', 'Test Report');
    form.append('description', 'Test Description');
    form.append('uploadedBy', dummyId);
    form.append('department', 'IT');

    try {
        console.log('Attempting to upload to http://localhost:5001/api/reports/upload');
        const response = await fetch('http://localhost:5001/api/reports/upload', {
            method: 'POST',
            body: form,
            headers: form.getHeaders()
        });

        console.log('Status:', response.status);
        const text = await response.text();
        console.log('Response:', text);
    } catch (error) {
        console.error('Error:', error);
    }
}

testUpload();
