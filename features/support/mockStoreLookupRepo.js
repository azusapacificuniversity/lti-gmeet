class mockStoreLookupRepo {
    constructor(arr) {
        this.arr = arr;
    }

    async saveCourse(event) {
        return this.arr.push(event);
    }

    async findByClassId(classId) {
        return this.arr.find(event => event.class_id == classId);
    }
}

module.exports = mockStoreLookupRepo;