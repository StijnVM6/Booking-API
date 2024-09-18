const checkForMissingArguments = async (details, type) => {
    const areThereMissingArguments = Object.values(details).some((value) => {
        if (value === undefined) return true;
        else return false;
    });

    let missingArguments = [];

    if (areThereMissingArguments === true) {
        // Which arguments are missing ? 
        Object.entries(details).forEach(([key, value]) => {
            if (value === undefined) {
                console.log("--> Required details missing:", key);
                missingArguments.push(`Required details missing: ${key}`);
            }
        });
        missingArguments.push(`==> These required arguments are missing. Create new ${type} failed.`);
        return missingArguments;
    } else return missingArguments = null;
};

export default checkForMissingArguments;