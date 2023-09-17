import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLink } from "../api/links";

const ShortenedLinkPage = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  useEffect(() => {
    if (!linkId) navigate("/");
    getLink(+!linkId).then((originalUrl) => {
      navigate(originalUrl);
    });
  }, [linkId, navigate]);

  return <></>;
};
export default ShortenedLinkPage;
