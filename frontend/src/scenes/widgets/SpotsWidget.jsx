import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import SpotWidget from "./SpotWidget";

const SpotsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getSpots = async () => {
    const response = await fetch("http://localhost:3001/spots", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getTouristSpots = async () => {
    const response = await fetch(
      `http://localhost:3001/spots/${userId}/spots`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getTouristSpots();
    } else {
      getSpots();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts &&
        posts.map &&
        posts.map(
          ({
            _id,
            userId,
            name,
            location,
            picturePath,
            description,
            pricingStructure,
          }) => (
            <SpotWidget
              key={_id}
              spotId={_id}
              spotOwnerId={userId}
              name={name}
              location={location}
              picturePath={picturePath}
              description={description}
              pricingStructure={pricingStructure}
            />
          )
        )}
    </>
  );
};

export default SpotsWidget;
