process.stdin.on('readable', () => {
    const inputString = process.stdin.read().toString();
    if (inputString) {
        process.stdout.write(inputString.split('').reverse().join('') + '\n');
    }
});
