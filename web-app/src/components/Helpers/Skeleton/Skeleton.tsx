import { Skeleton } from "@mantine/core";
import "./Skeleton.css";

export default ({
  type,
}: {
  type:
    | "single-book"
    | "main-page-books-category"
    | "category-page-single-book-wrapper"
    | "user-books-page-single-book"
    | "main-page-category-books-number"
    | "subscription-page-top"
    | "subscription-page-payment";
}) => {
  switch (type) {
    case "single-book":
      return <SingleBookSkeleton />;
    case "main-page-books-category":
      return <MainPageBooksCategorySkeleton />;
    case "category-page-single-book-wrapper":
      return <CategoryPageBookSkeleton />;
    case "user-books-page-single-book":
      return <UserBooksPageBookSkeleton />;
    case "main-page-category-books-number":
      return <MainPageCategoryBooksNumber />;
    case "subscription-page-top":
      return <SubscriptionPageTopPlaceholder />;
    case "subscription-page-payment":
      return <SubscriptionPagePaymentPlaceholder />;
    default:
      return <UserBooksPageBookSkeleton />;
  }
};

function SingleBookSkeleton() {
  return (
    <div className="skeleton_container">
      <Skeleton height={270} width={190} mb={7} />
      <Skeleton height={15} width={150} />
      <Skeleton height={15} mt={6} width={190} />
    </div>
  );
}

function MainPageBooksCategorySkeleton() {
  return (
    <>
      <Skeleton height={25} width={250} />
      <Skeleton height={20} mt={6} width={170} mb={20} />
      <div className="skeleton_container df">
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
        <div>
          <Skeleton height={270} width={190} mb={7} />
          <Skeleton height={15} width={150} />
          <Skeleton height={15} mt={6} width={190} />
        </div>
      </div>
    </>
  );
}

function CategoryPageBookSkeleton() {
  return (
    <div className="skeleton_container category-page-skeleton_container df df-fs">
      <Skeleton height={290} width={200} mb={7} mr={15} />
      <div>
        <Skeleton height={18} mb={6} width={190} />
        <Skeleton height={16} mb={20} width={150} />
        <div className="df df-fs">
          <Skeleton height={12} width={50} mr={15} />
          <Skeleton height={12} width={50} mr={15} />
          <Skeleton height={12} width={50} mr={15} />
          <Skeleton height={12} width={50} mr={15} />
        </div>
        <Skeleton height={4} width="100%" mt={20} mb={20} />
        <Skeleton height={130} width="100%" mt={20} mb={20} />
      </div>
    </div>
  );
}

function UserBooksPageBookSkeleton() {
  return (
    <div className="skeleton_container">
      <Skeleton height={70} width={650} mb={7} className="df"></Skeleton>
    </div>
  );
}

function MainPageCategoryBooksNumber() {
  return (
    <div className="skeleton_container">
      <Skeleton height={13} width={70} mb={7} className="df"></Skeleton>
    </div>
  );
}

function SubscriptionPageTopPlaceholder() {
  return (
    <div className="skeleton_container">
      <Skeleton height={90} width={700} mb={7}></Skeleton>
    </div>
  );
}

function SubscriptionPagePaymentPlaceholder() {
  return (
    <div className="skeleton_container">
      <Skeleton height={70} width={700} mb={7}></Skeleton>
    </div>
  );
}
