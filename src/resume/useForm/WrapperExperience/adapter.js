const AdapterExperience = {
    /**
     * @description 项目经验
     */
    project(list) {
        if(!list || list.length === 0) return [];
        const experienceList = list.map((item) => {
            return {
                ...item,
                title: item.projectName
            }
        });
        return experienceList;
    },
    /**
     * @description 工作经验
     */
    work(list) {
        if(!list || list.length === 0) return [];
        const experienceList = list.map((item) => {
            return {
                ...item,
                title: item.department
            }
        });
        return experienceList;
    },
    /**
     * @description 在校经验
     */
    school(list) {
        if(!list || list.length === 0) return [];
        const experienceList = list.map((item) => {
            return {
                ...item,
                title: item.department
            }
        });
        return experienceList;
    }
}

export default AdapterExperience