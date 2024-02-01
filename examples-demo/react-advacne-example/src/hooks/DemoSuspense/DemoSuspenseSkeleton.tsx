import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
  IconButton,
  Image,
  Button,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { BiLike, BiChat, BiShare } from "react-icons/bi";

const DemoSuspenseCardSkeleton = () => {
  return (
    <Card maxW="md">
      <CardHeader>
        <Flex spacing="4">
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            {/* <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" /> */}
            <SkeletonCircle size="10" />
            <Box>
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
              <SkeletonText
                mt="4"
                noOfLines={4}
                spacing="4"
                skeletonHeight="2"
              />
            </Box>
          </Flex>
          <Skeleton height="20px" />
        </Flex>
      </CardHeader>
      <CardBody>
        <Skeleton height="20px" />
      </CardBody>
      <Skeleton />
      <CardFooter
        justify="space-between"
        flexWrap="wrap"
        sx={{
          "& > button": {
            minW: "136px",
          },
        }}
      >
      </CardFooter>
    </Card>
  );
};

export default DemoSuspenseCardSkeleton;
