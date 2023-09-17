import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getLink } from "../api/links";

const ShortenedLinkPage = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  useEffect(() => {
    if (!linkId) navigate("/");
    try {
      if (linkId)
        getLink(parseInt(linkId)).then((obj) => {
          window.location.href = obj.originalUrl;
        });
    } catch (err) {
      console.error(err);
    }
  }, [linkId, navigate]);

  return <></>;
};
export default ShortenedLinkPage;
