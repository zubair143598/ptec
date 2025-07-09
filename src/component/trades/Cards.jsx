import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

const Cards = () => {
  const cardsData = [
  {
    picture: "/card1.jpg",
    title: "Accounts and Finance",
    courses: "35 Courses",
  },
  {
    picture: "/card2.png",
    title: "Banking",
    courses: "14 Courses",
  },
  {
    picture: "/card3.jpg",
    title: "Clinical Medical",
    courses: "27 Courses",
  },
  {
    picture: "/card4.jpg",
    title: "conservation Environment",
    courses: "14 Courses",
  },
  {
    picture: "/card5.jpg",
    title: "Construction",
    courses: "21 Courses",
  },
  {
    picture: "/card6.jpg",
    title: "Education Diploma",
    courses: "13 Courses",
  },
  {
    picture: "/card7.jpg",
    title: "Technical Engineering",
    courses: "36 Courses",
  },
  {
    picture: "/card8.jpg",
    title: "Executive Courses",
    courses: "11 Courses",
  },
  {
    picture: "/card9.jpg",
    title: "Fashion Media",
    courses: "13 Courses",
  },
  {
    picture: "/card10.jpg",
    title: "Health and Safety", // 11th title moved to 10th
    courses: "35 Courses", // Keep original courses
  },
  {
    picture: "/card11.jpg",
    title: "Health Care", // 12th
    courses: "22 Courses",
  },
  {
    picture: "/card12.jpg",
    title: "Hotel Management", // 13th
    courses: "12 Courses",
  },
  {
    picture: "/card13.jpg",
    title: "Information Technology", // 14th
    courses: "21 Courses",
  },
  {
    picture: "/card14.jpg",
    title: "Mechanical", // 15th
    courses: "35 Courses",
  },
  {
    picture: "/card15.jpg",
    title: "Medical", // 16th
    courses: "23 Courses",
  },
  {
    picture: "/card16.jpg",
    title: "Oil and Gas", // 17th
    courses: "35 Courses",
  },
  {
    picture: "/card17.jpg",
    title: "Professional Courses", // 18th
    courses: "07 Courses",
  },
  {
    picture: "/card18.jpg",
    title: "Project Management", // 19th
    courses: "28 Courses",
  },
  {
    picture: "/card19.jpg",
    title: "Vocational Courses", // 20th
    courses: "22 Courses",
  },
  {
    picture: "/card20.jpg",
    title: "Air Courses", // 21st
    courses: "40 Courses",
  },
  {
    picture: "/card21.jpg",
    title: "Business Administration", // 22nd
    courses: "12 Courses",
  },
  {
    picture: "/card22.jpg",
    title: "General Diplomas", // 23rd
    courses: "28 Courses",
  },
  {
    picture: "/card23.jpg",
    title: "Technology Studies", // 24th → move to 23rd
    courses: "35 Courses",
  },
  {
    picture: "/card24.jpg",
    title: "Veterinary Courses", // New last title
    courses: "35 Courses",
  },
];


  return (
    <div className="max-w-[1140px] mx-auto  px-4 py-12 ">
      <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-y-4">
        {cardsData.map((data, index) => {
          return (
            <Card
            key={index}
            sx={{
              maxWidth: 255,
              boxShadow: 3,
              position: "relative",
              height:"100%",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#056a58",
                color:"white"
              },
            }}
            >
               <Link href="/trades/accounts-finance">
              <CardMedia
                sx={{ height: 180 }}
                image={data.picture}
                title="card1"
              />
              <CardContent
                sx={{
                  alignItems: "center",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: "24px",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {data.title}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "12px",
                    padding: "4px 10px",
                    textAlign: "center",
                    backgroundColor: "#28a745",
                    borderRadius: "15px",
                    color: "white",
                    fontWeight: 700,
                    position: "absolute",
                    bottom: "8px",
                  }}
                >
                  {data.courses}
                </Typography>
              </CardContent>
               </Link>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
