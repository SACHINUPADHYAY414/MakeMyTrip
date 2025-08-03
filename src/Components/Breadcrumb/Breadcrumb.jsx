import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";

const BreadcrumbNav = ({ extra = [] }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const breadcrumbs = pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
    const formattedName = name
      .replace(/-/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());

    return {
      name: formattedName,
      to: routeTo,
      isLast: index === pathnames.length - 1 && extra.length === 0
    };
  });

  extra.forEach((item, i) => {
    breadcrumbs.push({
      name: item.name,
      to: item.to || "#",
      isLast: i === extra.length - 1
    });
  });

  return (
    <Breadcrumb className="custom-breadcrumb">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: "/" }} className="fw-bold">
        <IoHome className="mb-1" /> Home
      </Breadcrumb.Item>

      {breadcrumbs.map((crumb, index) =>
        crumb.isLast ? (
          <Breadcrumb.Item active key={index}>
            {crumb.name}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item
            key={index}
            linkAs={Link}
            linkProps={{ to: crumb.to }}
          >
            {crumb.name}
          </Breadcrumb.Item>
        )
      )}
    </Breadcrumb>
  );
};

export default BreadcrumbNav;
