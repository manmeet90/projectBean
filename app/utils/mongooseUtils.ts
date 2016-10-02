export const mongooseUtils = {
    addDefaultCCUU : function(next) {
        let currentDate = new Date().getTime();
        this.updatedAt = currentDate;

        if (!this.createdAt) {
            this.createdAt = currentDate;
        }

        if (!this.createdBy) {
            this.createdBy = "System";
        }

        if (!this.updatedBy) {
            this.updatedBy = "System";
        }

        next();
    }
};
