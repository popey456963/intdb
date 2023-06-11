mod parse;

use nom::character::complete::{char, digit1};
use nom::combinator::{map_res, opt, recognize};
use nom::multi::separated_list1;
use nom::sequence::tuple;
use nom::IResult;
use num_bigint::BigInt;
use rayon::prelude::*;

use std::fs::File;
use std::io::{prelude::*, BufReader};
use std::str::{self, FromStr};
use std::time::Instant;

use std::error::Error;

#[derive(Debug, PartialEq)]
pub struct Sequence {
    pub id: usize,
    pub values: Vec<BigInt>,
}

fn parse_usize(input: &str) -> IResult<&str, usize> {
    map_res(recognize(digit1), str::parse)(input)
}

fn parse_bigint(input: &str) -> IResult<&str, BigInt> {
    map_res(
        recognize(tuple((opt(char('-')), digit1))),
        FromStr::from_str,
    )(input)
}

fn parse_line(input: &str) -> IResult<&str, Sequence> {
    let (input, _) = char('A')(input)?;
    let (input, id) = parse_usize(input)?;

    let (input, _) = char(' ')(input)?;
    let (input, _) = char(',')(input)?;

    let (input, values) = separated_list1(char(','), parse_bigint)(input)?;

    Ok((input.clone(), Sequence { id, values }))
}

fn get_sequences() -> Result<Vec<Sequence>, Box<dyn Error>> {
    let file = File::open("./data/stripped")?;
    let reader: BufReader<File> = BufReader::new(file);

    let mut sequences = Vec::new();

    for line in reader.split(b'\n').map(|l| l.unwrap()) {
        if line[0] == b'#' {
            // Comment
            continue;
        }
        let s = match str::from_utf8(&line) {
            Ok(v) => v,
            Err(e) => panic!("Invalid UTF-8 sequence: {}", e),
        };

        let sequence = parse_line(s).unwrap();
        sequences.push(sequence.1);
    }

    Ok(sequences)
}

fn main() -> Result<(), Box<dyn Error>> {
    let load_start = Instant::now();

    let sequences = get_sequences()?;

    let load_duration: std::time::Duration = load_start.elapsed();

    let search_start = Instant::now();

    let value = BigInt::from(2);
    // let mut count = 0;

    let count = sequences
        .par_iter()
        .filter(|&v| v.values.contains(&value))
        .count();

    // for seq in sequences.iter() {
    //     if seq.values.contains(&value) {
    //         count += 1;
    //     }
    // }

    let search_duration = search_start.elapsed();

    println!("Processed {} lines in {:?}", sequences.len(), load_duration);
    println!(
        "Found {} numbers with value {} in {:?}",
        count, value, search_duration
    );

    Ok(())
}
