USE [master]
GO
/****** Object:  Database [News]    Script Date: 19/08/2021 18:37:38 ******/
CREATE DATABASE [News]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'News', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\News.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'News_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL11.MSSQLSERVER\MSSQL\DATA\News_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [News] SET COMPATIBILITY_LEVEL = 110
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [News].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [News] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [News] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [News] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [News] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [News] SET ARITHABORT OFF 
GO
ALTER DATABASE [News] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [News] SET AUTO_CREATE_STATISTICS ON 
GO
ALTER DATABASE [News] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [News] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [News] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [News] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [News] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [News] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [News] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [News] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [News] SET  DISABLE_BROKER 
GO
ALTER DATABASE [News] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [News] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [News] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [News] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [News] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [News] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [News] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [News] SET RECOVERY FULL 
GO
ALTER DATABASE [News] SET  MULTI_USER 
GO
ALTER DATABASE [News] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [News] SET DB_CHAINING OFF 
GO
ALTER DATABASE [News] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [News] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
EXEC sys.sp_db_vardecimal_storage_format N'News', N'ON'
GO
USE [News]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Categoria](
	[id_categoria] [bigint] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[portada] [tinyint] NOT NULL,
	[hide] [tinyint] NOT NULL,
 CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Fotos]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Fotos](
	[id_foto] [bigint] IDENTITY(1,1) NOT NULL,
	[url] [varchar](800) NOT NULL,
	[hide] [tinyint] NOT NULL,
	[titulo] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Fotos] PRIMARY KEY CLUSTERED 
(
	[id_foto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[main]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[main](
	[id_main] [bigint] IDENTITY(1,1) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[urlwwa] [varchar](800) NOT NULL,
	[textwwa] [text] NOT NULL,
	[textautor] [text] NOT NULL,
	[urlautor] [varchar](800) NOT NULL,
 CONSTRAINT [PK_main] PRIMARY KEY CLUSTERED 
(
	[id_main] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Noticia]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Noticia](
	[id_noticia] [bigint] IDENTITY(1,1) NOT NULL,
	[id_categoria] [bigint] NOT NULL,
	[titulo] [text] NOT NULL,
	[subtitulo] [text] NOT NULL,
	[descripcion] [text] NOT NULL,
	[foto_portada] [text] NOT NULL,
	[foto_noticia] [text] NULL,
	[portada] [tinyint] NOT NULL,
	[hide] [tinyint] NOT NULL,
	[date] [date] NOT NULL,
	[video_noticia] [varchar](500) NULL,
 CONSTRAINT [PK_Noticia] PRIMARY KEY CLUSTERED 
(
	[id_noticia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Portada]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Portada](
	[id_portada] [int] NOT NULL,
	[cantidad] [int] NOT NULL,
	[latest] [bigint] NOT NULL,
	[latestr] [bigint] NOT NULL,
	[nombre] [nchar](10) NOT NULL,
	[igual] [int] NOT NULL,
 CONSTRAINT [PK_Portada] PRIMARY KEY CLUSTERED 
(
	[id_portada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[id_usuario] [bigint] IDENTITY(1,1) NOT NULL,
	[nickname] [varchar](100) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[password] [varchar](100) NOT NULL,
	[rol] [tinyint] NOT NULL,
	[user_foto] [varchar](250) NOT NULL,
	[user_descripcion] [varchar](300) NOT NULL,
	[nombre] [varchar](100) NULL,
	[apellido] [varchar](100) NULL,
	[active] [bit] NULL,
	[token] [nchar](100) NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[id_usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Videos]    Script Date: 19/08/2021 18:37:38 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Videos](
	[id_video] [bigint] IDENTITY(1,1) NOT NULL,
	[url] [text] NOT NULL,
	[hide] [tinyint] NOT NULL,
	[titulo] [varchar](50) NOT NULL,
 CONSTRAINT [PK_Videos] PRIMARY KEY CLUSTERED 
(
	[id_video] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([id_categoria], [nombre], [portada], [hide]) VALUES (1, N'POLICY ANALISYS', 1, 1)
INSERT [dbo].[Categoria] ([id_categoria], [nombre], [portada], [hide]) VALUES (2, N'LITERACY', 1, 1)
SET IDENTITY_INSERT [dbo].[Categoria] OFF
SET IDENTITY_INSERT [dbo].[main] ON 

INSERT [dbo].[main] ([id_main], [nombre], [urlwwa], [textwwa], [textautor], [urlautor]) VALUES (1, N'portada', N'a', N'Union Square Learning is a nonprofit helping educational organizations develop innovative ideas and achieve better results.  We provide education policy advice and insight into solving difficult problems.  We work with school districts and public charter schools to develop strategy, scale up smartly and achieve great things for all students.

Our name is inspired by a meeting place in San Francisco, a grand park in New York City, and one of the most beautiful vistas in Washington, DC, where the United States Capitol meets the National Mall.', N'David is founder of Union Square Learning and helped to create 826DC, an after-school writing center.  Previously, at the College Board, David led a team that worked with states and districts to rethink their assessment and accountability policies in support of college and career readiness.  He was also education policy advisor to Governor Andrew Cuomo, where he collaborated with colleagues to revamp the state’s teacher evaluation law and successfully negotiated an on-time $53 billion education budget.

From 2005-2011, David was Program Director at the National Governors Association (NGA) Center for Best Practices, where he led projects on high school reform and efforts to improve instruction.  He also worked on the development of the Common Core State Standards.  David is the author of Raising Rigor, Getting Results: Lessons Learned from AP Expansion, “Increasing College Success: A Roadmap for Governors” and is co-author of “Retooling Career Technical Education.”

After graduate school, David worked for America’s Choice School Design and researched efforts to turn around low-performing schools in Chicago and Kentucky.  He began his career as a charter corps member of Teach for America, teaching middle school math for three years in South Central Los Angeles.

David earned a B.A. in American History from Vanderbilt University, a M.A. in Public Policy from the Robert LaFollette Institute and Ph.D. in Education Policy from the University of Wisconsin-Madison.', N'a')
SET IDENTITY_INSERT [dbo].[main] OFF
INSERT [dbo].[Portada] ([id_portada], [cantidad], [latest], [latestr], [nombre], [igual]) VALUES (0, 3, 34, 21, N'portada   ', 1)
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([id_usuario], [nickname], [email], [password], [rol], [user_foto], [user_descripcion], [nombre], [apellido], [active], [token]) VALUES (2, N'nahadjq', N'adser247@gmail.com', N'96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 0, N'./../../../assets/img/profile.png', N'sin', N'sin', N'sin', 1, N'c58129a1-fc68-46a2-9af0-e0f383b63316                                                                ')
INSERT [dbo].[Usuario] ([id_usuario], [nickname], [email], [password], [rol], [user_foto], [user_descripcion], [nombre], [apellido], [active], [token]) VALUES (3, N'admin', N'admin@admin.com', N'96cae35ce8a9b0244178bf28e4966c2ce1b8385723a96a6b838858cdd6ca0a1e', 0, N'./../../../assets/img/profile.png', N'first', N'admin', N'admin', 1, N'                                                                                                    ')
SET IDENTITY_INSERT [dbo].[Usuario] OFF
USE [master]
GO
ALTER DATABASE [News] SET  READ_WRITE 
GO
