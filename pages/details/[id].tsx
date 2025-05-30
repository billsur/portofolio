import Heading from "../../components/Heading";
import { projects } from "@data/projects";
import { useRouter } from "next/router";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faExternalLinkAlt, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slide from "@components/Slide";
import { motion } from "framer-motion";
import { item, list, slideUp } from "@helpers/animation";
import NotFound from "pages/404";

const ProjectDetails = () => {
  const router = useRouter();

  const { id } = router.query;

  const project = projects.find((project) => project.id === id);

  return (
    <>
      {!project && <NotFound />}
      {project && (
        <section className="min-h-screen py-32 flex items-center overflow-hidden dark:bg-dark-theme">
          <div className="max-w-screen-lg mx-auto w-full px-2">
            <div className="lg:flex lg:justify-center lg:space-x-12 mb-12 mt-8">
              <Heading heading={project?.name} stroke />

              <motion.div initial="hidden" animate="visible" variants={list}>
                <motion.h4
                  variants={item}
                  className="mb-2 text-xl text-gray-900 dark:text-gray-300 font-main font-semibold"
                >
                  Description:
                </motion.h4>
                <motion.p
                  variants={item}
                  className="mb-6 text-lg text-gray-700 dark:text-gray-200 font-main font-medium"
                >
                  {project?.description}
                </motion.p>
                <motion.h4
                  variants={item}
                  className="mb-2 text-xl text-gray-900 dark:text-gray-300  font-main font-semibold"
                >
                  Tools:
                </motion.h4>
                <motion.div variants={item} className="mb-6">
                  {project?.tools.map((tool, index) => (
                    <span
                      key={`${tool}-${index}`}
                      className=" mr-2 text-lg text-gray-700 dark:text-gray-200 font-main font-medium"
                    >
                      {tool}
                      {index < project.tools.length - 1 && ','}
                    </span>
                  ))}
                </motion.div>
                <motion.div
                  variants={item}
                  className="flex justify-between font-main dark:text-gray-200 font-bold lg:w-full md:w-96 w-full "
                >
                  <a
                    href={project?.linkToPage}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="mr-4 hover:text-primary flex items-center space-x-2"
                  >
                    <span>Visit App</span>
                    <FontAwesomeIcon className="w-4" icon={faExternalLinkAlt} />
                  </a>
                  { 
                    project?.linkToSrc && 
                    <a
                      href={project?.linkToSrc}
                      rel="noopener noreferrer"
                      target="_blank"
                      className="mr-4 hover:text-primary flex  items-center  space-x-2"
                    >
                      <span>View Source</span>
                      <FontAwesomeIcon className="w-4" icon={faGithub} />
                    </a>
                  }
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="max-w-screen-md px-2 mx-auto"
            >
              <Slide>
                {project?.imgs?.map((img, index) => (
                  <div key={`img-${index}`}>
                    <img src={img} alt="project_img" />
                  </div>
                ))}
              </Slide>
            </motion.div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProjectDetails;
