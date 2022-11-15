// this is where time stamp helper function will go

module.exports = {
    format_date: date => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
};