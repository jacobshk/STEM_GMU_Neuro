function write_csv(args){

    //args should be a request body; key val dict; should be of schema:
    /*
    timestamp: str
    deviceId: str
    readings: [int]
    */
   
    const fs = require('fs');
    const createCsvWriter = require('csv-writer').createObjectCsvWriter;
    
    const filePath = 'data.csv';
    
    // Check if the file exists, and if not, create it with headers
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, 'name,age,city\n');
    }
    
    // Create CSV writer
    const csvWriter = createCsvWriter({
        path: filePath,
        header: [
            {id: 'name', title: 'name'},
            {id: 'age', title: 'age'},
            {id: 'city', title: 'city'}
        ],
        append: true
    });
    
    // Data to write
    const data = [
        { name: 'Alice', age: 30, city: 'New York' },
        { name: 'Bob', age: 25, city: 'Los Angeles' }
    ];
    
    // Write data to CSV
    csvWriter.writeRecords(data)
        .then(() => console.log('Data written successfully!'))
        .catch((err) => console.error('Error writing to CSV:', err));
}

write_csv() 