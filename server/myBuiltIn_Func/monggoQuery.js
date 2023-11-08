const findData = async(schema, option) => {
    try {
        let query = await schema.findOne(option)
        if(query != null){
            return query;
        }
    } catch (error) {
        console.log(error);
    }
    
        

}

module.exports = {
    findData,
}