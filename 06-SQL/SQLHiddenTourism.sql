/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     3/8/2021 20:47:38                            */
/*==============================================================*/


drop table if exists ADMINISTRATOR;

drop table if exists PLACE;

drop table if exists RESERVATION;

drop table if exists RESTAURANT;

drop table if exists ROADMAP;

drop table if exists ROADMAP_PLACES;

drop table if exists TOURGUIDE;

drop table if exists TOURIST;

/*==============================================================*/
/* Table: ADMINISTRATOR                                         */
/*==============================================================*/
create table ADMINISTRATOR
(
   IDADMINISTRATOR      varchar(10) not null,
   FIRSTNAMEADMINISTRATOR varchar(32),
   LASTNAMEADMINISTRATOR varchar(32),
   PASSWORDADMINISTRATOR varchar(32),
   USERADMINISTRATOR    varchar(32),
   EMAILADMINISTRATOR   varchar(64),
   primary key (IDADMINISTRATOR)
);

/*==============================================================*/
/* Table: PLACE                                                 */
/*==============================================================*/
create table PLACE
(
   IDPLACE              varchar(10) not null,
   NAMEPLACE            varchar(64),
   PROVINCEPLACE        varchar(32),
   CANTONPLACE          varchar(32),
   ADDRESSPLACE         varchar(32),
   CONTACTPLACE         varchar(16),
   ACTIVITIESPLACE      varchar(32),
   primary key (IDPLACE)
);

/*==============================================================*/
/* Table: RESERVATION                                           */
/*==============================================================*/
create table RESERVATION
(
   IDRESERVATION        varchar(10) not null,
   IDTOURIST            varchar(10),
   LOCATIONRESERVATION  varchar(32),
   PAYMENTTYPERESERVATION varchar(16),
   RESERVATIONDATERESERVATION date,
   primary key (IDRESERVATION)
);

/*==============================================================*/
/* Table: RESTAURANT                                            */
/*==============================================================*/
create table RESTAURANT
(
   IDRESTAURANT         varchar(10) not null,
   NAMERESTAURANT       varchar(32),
   ADDRESSRESTAURANT    varchar(32),
   OPENINGTIMERESTAURANT varchar(8),
   CLOSINGTIMERESTAURANT varchar(8),
   CONSUMPTIONTYPERESTAURANT varchar(32),
   primary key (IDRESTAURANT)
);

/*==============================================================*/
/* Table: ROADMAP                                               */
/*==============================================================*/
create table ROADMAP
(
   IDROADMAP            varchar(10) not null,
   IDRESTAURANT         varchar(10) not null,
   IDRESERVATION        varchar(10),
   IDTOURGUIDE          varchar(10) not null,
   IDROADMAP_PLACES     varchar(10),
   primary key (IDROADMAP)
);

/*==============================================================*/
/* Table: ROADMAP_PLACES                                        */
/*==============================================================*/
create table ROADMAP_PLACES
(
   IDROADMAP_PLACES     varchar(10) not null,
   IDPLACE              varchar(10),
   IDPROVINCERP         varchar(10),
   primary key (IDROADMAP_PLACES)
);

/*==============================================================*/
/* Table: TOURGUIDE                                             */
/*==============================================================*/
create table TOURGUIDE
(
   IDTOURGUIDE          varchar(10) not null,
   FIRSTNAMETOURGUIDE   varchar(32),
   LASTNAMETOURGUIDE    varchar(32),
   primary key (IDTOURGUIDE)
);

/*==============================================================*/
/* Table: TOURIST                                               */
/*==============================================================*/
create table TOURIST
(
   IDTOURIST            varchar(10) not null,
   FIRSTNAMETOURIST     varchar(32),
   LASTNAMETOURIST      varchar(32),
   PASSWORDTOURIST      varchar(16),
   USERTOURIST          varchar(32),
   EMAILTOURIST         varchar(64),
   primary key (IDTOURIST)
);

alter table RESERVATION add constraint FK_TOURIST_RESERVATION foreign key (IDTOURIST)
      references TOURIST (IDTOURIST) on delete restrict on update restrict;

alter table ROADMAP add constraint FK_RESERVATION_ROADMAP foreign key (IDRESERVATION)
      references RESERVATION (IDRESERVATION) on delete restrict on update restrict;

alter table ROADMAP add constraint FK_RESTAURANT_ROADMAP foreign key (IDRESTAURANT)
      references RESTAURANT (IDRESTAURANT) on delete restrict on update restrict;

alter table ROADMAP add constraint FK_ROADMAP_PLACER_ROADMAP foreign key (IDROADMAP_PLACES)
      references ROADMAP_PLACES (IDROADMAP_PLACES) on delete restrict on update restrict;

alter table ROADMAP add constraint FK_TOURGUIDE_ROADMAP foreign key (IDTOURGUIDE)
      references TOURGUIDE (IDTOURGUIDE) on delete restrict on update restrict;

alter table ROADMAP_PLACES add constraint FK_RELATIONSHIP_5 foreign key (IDPLACE)
      references PLACE (IDPLACE) on delete restrict on update restrict;

