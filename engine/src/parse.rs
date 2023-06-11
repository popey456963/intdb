use std::error::Error;

#[derive(Default, Debug, PartialEq)]
pub struct Sequence {
    pub number: usize,
    pub id: Option<String>,
    pub data: String,
    pub name: String,

    pub comment: Option<Vec<String>>,
    pub reference: Option<Vec<String>>,
    pub link: Option<Vec<String>>,
    pub formula: Option<Vec<String>>,
    pub example: Option<Vec<String>>,
    pub maple: Option<Vec<String>>,
    pub mathematica: Option<Vec<String>>,
    pub program: Option<Vec<String>>,
    pub xref: Option<Vec<String>>,

    pub keyword: String,
    pub offset: String,
    pub author: String,

    // pub references: usize,
    // pub revision: usize,
    pub time: String,
    pub created: String,
}

fn parse_internal(seq: &String) -> Result<Sequence, Box<dyn Error>> {
    Ok(Sequence {
        number: 45,
        data: "1,1,2,3,5,8".to_string(),
        name: "Fibonnaci Sequence".to_string(),

        keyword: "nonn,core,nice,easy,hear,changed".to_string(),
        offset: "0,4".to_string(),
        author: "_N. J. A. Sloane_, 1964".to_string(),

        time: "2023-06-08T11:34:22-04:00".to_string(),
        created: "1991-04-30T03:00:00-04:00".to_string(),

        ..Default::default()
    })
}
