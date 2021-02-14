function recurse(time) {
    if(time<0) {
        recurse();
    }
    else {
console.log(time);
        // stop calling recurse()
    }
}

recurse(-33);